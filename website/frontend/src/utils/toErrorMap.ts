import {Error} from "../generated/graphql";

export const toErrorMap = (errors: Error[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({field, message}) => {
        errorMap[field] = message;
    });

    return errorMap;

}