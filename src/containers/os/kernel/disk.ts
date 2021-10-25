/**
 * Container disk image
 */

import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { Logger } from '../../../console/utils/logger';
import { ReadObjectRecursively, WriteObjectRecursively } from '../../utils/object_path_read_write';

/** Registry type */
type RegistryType = {
    REOS: {
        version: `${number}.${number}.${number}`, // RE-Major.Minor.Dev
        name: `Re-${string}` // Codename
    },
    ENV: {
        [variable: string]: unknown
    }
};

/** Folder type */
type FolderType = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [name: string]: FolderType | string,
};

/** FileSystem type */
type FileSystemType = {
    bin: FolderType,
    user: FolderType,
    apps: FolderType
};

/** Disk class */
export class ContainerDisk {
    private readonly registry: RegistryType;
    private readonly fileSystem: FileSystemType;

    /** Disk constructor */
    private constructor(registry: RegistryType, fileSystem: FileSystemType) {
        this.registry = registry;
        this.fileSystem = fileSystem;
    }

    /** Build disk from path */
    public static async MakeFromPath(path: string): Promise<ContainerDisk> {
        Logger.Info(`Loading disk from path: ${path}`, path);

        // Load disk
        let diskContent;
        try {
            diskContent = await readFile(resolve(path));
        } catch (e) {
            Logger.Error('Failed to read file: ' + path);
            Logger.Error(e.message);
        }

        // Parse disk data
        let parsedDiskContent;
        try {
            parsedDiskContent = JSON.parse(diskContent);
        } catch (e) {
            Logger.Error('Failed to parse file: ' + path);
            Logger.Error(e.message);
        }

        // Check disk structure
        if (!('registry' in parsedDiskContent) || !('fileSystem' in parsedDiskContent)) {
            Logger.Error('Failed disk check: unexpected structure');
            return;
        }

        return new ContainerDisk(parsedDiskContent.registry, parsedDiskContent.fileSystem);
    }

    /** Build disk from scratch */
    public static async MakeFromScratch(): Promise<ContainerDisk> {
        Logger.Info('Building disk from scratch');
        return new ContainerDisk({
            ENV: {},
            REOS: {
                version: '0.0.1',
                name: 'Re-Start'
            }
        }, {
            bin: {},
            apps: {},
            user: {}
        });
    }

    /** Save disk data */
    public async Save(path: string): Promise<void> {
        const encodedDisk = JSON.stringify({
            registry: this.registry,
            fileSystem: this.fileSystem
        });

        // Saving to file
        try {
            await writeFile(resolve(path), encodedDisk);
        } catch (e) {
            Logger.Error('Disk save failed');
            Logger.Error(e.message);
        }
    }

    /** Get registry value */
    public GetRegistryValue(path: string): string | null {
        const result = ReadObjectRecursively(
            this.registry,
            path
        );
        return typeof result === 'string' ? result : null;
    }

    /** Set registry value */
    public SetRegistryValue(path: string, value: string): void {
        if (path.includes('REOS') && !ReadObjectRecursively(
            this.registry,
            path
        )) {
            return;
        }

        // Write
        WriteObjectRecursively(
            this.registry,
            path,
            value
        );
    }
}
