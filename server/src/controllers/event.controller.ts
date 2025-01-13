import { Request, RequestHandler, Response } from "express";
import Event from "../schemas/event.schema";

/**
 * Create event controller
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @description Create a new event
 * @route POST /api/v1/event
 * @access Private
 * @type Controller
 * @statusCodes 201 - Event created
 * @statusCodes 500 - Server error
 */
export const createEventController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get title, description, and date from the request body
        const { title, description, location } = req.body;
        // Create a new event
        const event = new Event({ title, description, location, createdBy: req.user?.id });
        // Save the event
        const savedEvents = await event.save();
        // Return a 201 status code
        res.status(201).json({ message: "Event created", savedEvents });
        return;
    } catch (error) {
        // Log the error
        console.error(error);
        // Return a 500 status code
        res.status(500).json({ message: "Server error" });
        return;
    }
}

/**
 * Get events controller
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @description Get all events
 * @route GET /api/v1/event
 * @access Private
 * @type Controller
 * @statusCodes 200 - Events found
 * @statusCodes 500 - Server error
 */

export const getEventsController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get all events
        const events = await Event.find().populate("createdBy", "-password");
        // Return a 200 status code
        res.status(200).json(events);
        return;
    } catch (error) {
        // Log the error
        console.error(error);
        // Return a 500 status code
        res.status(500).json({ message: "Server error" });
        return;
    }
}

/**
 * Get event controller
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @description Get a single event
 * @route GET /api/v1/event/:id
 * @access Private
 * @type Controller
 * @statusCodes 200 - Event found
 * @statusCodes 404 - Event not found
 * @statusCodes 500 - Server error
 */
export const getEventController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get the event ID from the request parameters
        const { id } = req.params;
        // Find the event by ID
        const event = await Event.findById(id);
        // If the event does not exist, return a 404 status code
        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }
        // Return a 200 status code
        res.status(200).json(event);
        return;
    } catch (error) {
        // Log the error
        console.error(error);
        // Return a 500 status code
        res.status(500).json({ message: "Server error" });
        return;
    }
}

/**
 * Update event controller
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @description Update a single event
 * @route PUT /api/v1/event/:id
 * @access Private
 * @type Controller
 * @statusCodes 200 - Event updated
 * @statusCodes 404 - Event not found
 * @statusCodes 500 - Server error
 */
export const updateEventController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get the event ID from the request parameters
        const { id } = req.params;
        // Get title, description, and date from the request body
        const { title, description, date } = req.body;
        // Find the event by ID and update it
        const event = await Event.findByIdAndUpdate(id, { title, description, date });
        // If the event does not exist, return a 404 status code
        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }
        // Return a 200 status code
        res.status(200).json({ message: "Event updated" });
        return;
    } catch (error) {
        // Log the error
        console.error(error);
        // Return a 500 status code
        res.status(500).json({ message: "Server error" });
        return;
    }
}

/**
 * Delete event controller
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @description Delete a single event
 * @route DELETE /api/v1/event/:id
 * @access Private
 * @type Controller
 * @statusCodes 200 - Event deleted
 * @statusCodes 404 - Event not found
 * @statusCodes 500 - Server error
 */
export const deleteEventController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get the event ID from the request parameters
        const { id } = req.params;
        // Find the event by ID and delete it
        const event = await Event.findByIdAndDelete(id);
        // If the event does not exist, return a 404 status code
        if (!event) {
            res.status(404).json({ message: "Event not found" });
            return;
        }
        // Return a 200 status code
        res.status(200).json({ message: "Event deleted" });
        return;
    } catch (error) {
        // Log the error
        console.error(error);
        // Return a 500 status code
        res.status(500).json({ message: "Server error" });
        return;
    }
}