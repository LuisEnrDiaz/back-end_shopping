import { Schema } from 'mongoose';

export function setToJson(value: Schema) {
    value.set('toJSON', {
        transform: (_document, returnedObject) => {
            returnedObject.id = returnedObject._id;
            delete returnedObject.__v;
            delete returnedObject._id;
        },
    });
}
