class UnknownError extends Error {
    constructor(message) {
        super();
        this.name = "UnknownError";
        this.message = message;
        this.code = 500;
    }
}

class ResourceNotFound extends Error {
    constructor(message) {
        super();
        this.name = "ResourceNotFound";
        this.message = message;
        this.code = 404;
    }
}

class Unauthorized extends Error {
    constructor(message) {
        super();
        this.name = "Unauthorized";
        this.message = message;
        this.code = 401;
    }
}

class ResourceExist extends Error {
    constructor(message) {
        super();
        this.name = "ResourceExist";
        this.message = message;
        this.code = 409;
    }
}

class MissingKeys extends Error {
    constructor(message) {
        super();
        this.name = "MissingKeys";
        this.message = message;
        this.code = 403;
    }
}

class NotImageMessage extends Error {
    constructor(comment) {
        super();
        this.name = "NotImageMessage";
        this.comment = comment;
        this.code = 409;
    }
}

module.exports = {
    UnknownError: UnknownError,
    ResourceNotFound: ResourceNotFound,
    Unauthorized: Unauthorized,
    MissingKeys: MissingKeys,
    ResourceExist: ResourceExist,
    NotImageMessage: NotImageMessage,
};
