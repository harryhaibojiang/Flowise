import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import vectorsService from '../../services/vectors'
import chatflowService from '../../services/chatflows'
import { getRateLimiter } from '../../utils/rateLimit'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { utilValidateKey } from '../../utils/validateKey'

const getRateLimiterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return getRateLimiter(req, res, next)
    } catch (error) {
        next(error)
    }
}

const upsertVectorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiResponse = await vectorsService.upsertVectorMiddleware(req)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const createInternalUpsert = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isInternal = true
        const apiResponse = await vectorsService.upsertVectorMiddleware(req, isInternal)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const createInternalUpsert_API = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const chatFlowId = req.params.id
        const chatflow = await chatflowService.getChatflowById(chatFlowId)
        if (!chatflow) {
            throw new InternalFlowiseError(StatusCodes.UNAUTHORIZED, `Unauthorized`)
        }
        const isKeyValidated = await utilValidateKey(req, chatflow)
        if (!isKeyValidated) {
            throw new InternalFlowiseError(StatusCodes.UNAUTHORIZED, `Unauthorized`)
        }

        const isInternal = true
        const apiResponse = await vectorsService.upsertVectorMiddleware(req, isInternal)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    upsertVectorMiddleware,
    createInternalUpsert_API,
    createInternalUpsert,
    getRateLimiterMiddleware
}
