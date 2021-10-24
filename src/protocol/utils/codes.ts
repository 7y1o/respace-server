/**
 * Protocol message codes
 */

/** Codes list */
export type MessageCodes =

    // Handshake codes
    /// Handshake start
      'hsr' // Handshake Start Request
    | 'hsy' // Handshake Start: Yes
    | 'hsn' // Handshake Start: No
    /// Test
    | 'hct' // Handshake Client Test
    | 'hts' // Handshake Test Success
    | 'htf' // Handshake Test Failure
    /// End
    | 'hce' // Handshake Client End
    | 'hes' // Handshake End: Success
    | 'hef' // Handshake End: Failure
    /// Etc
    | 'hue' // Handshake Unknown Error

    // Exchange codes
    /// Successful codes
    | 'eso' // Exchange Successful Operation
    /// Error codes
    | 'eeu' // Exchange Error Unknown
    /// Client Isolate actions
    | 'eci0' // Isolate - action 1: Start isolate
    | 'eci1' // Isolate - action 2: Stop isolate
    /// Server Isolate responses
    | 'esis' // Isolate - success
    | 'esif' // Isolate - failure
    /// Client Apps actions
    | 'eca0' // Apps - action 1: Open app
    | 'eca1' // Apps - action 2: Close app
    | 'eca2' // Apps - action 3: Get info
    /// Server Apps responses
    | 'esas' // Apps - success
    | 'esaf' // Apps - failure
    | 'esau' // Apps - update
;
