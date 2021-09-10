
//! Errors
export const showErr = ( msg: string ):never => {
    throw new Error(msg);
}