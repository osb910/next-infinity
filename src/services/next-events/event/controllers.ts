import {jsonifyError} from '@/lib/helpers';
import Event from './event-model';
import isEmail from 'validator/lib/isEmail';

export const getEvent = async (eventId: string) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) return jsonifyError({message: 'Event not found'});
    return {
      status: 'success',
      message: 'Event retrieved successfully',
      code: 200,
      data: event,
    };
  } catch (err) {
    return jsonifyError({err, message: 'Error retrieving event'});
  }
};

export const addComment = async (
  eventId: string,
  body: Record<string, string>
) => {
  try {
    const {author, email, comment} = body;
    if (
      !email ||
      !isEmail(email) ||
      !author ||
      !author.trim() ||
      !comment ||
      !comment.trim()
    ) {
      return jsonifyError({
        message: 'Invalid name, comment, or email address.',
        code: 422,
      });
    }
    const res = await Event.findByIdAndUpdate(eventId, {
      // alternative to unshift: adds to the beginning of the array
      $push: {comments: {$each: [body], $position: 0}},
    });

    if (!res) return jsonifyError({message: 'Inserting comment failed!'});

    return {status: 'success', message: 'Comment added!', data: res, code: 201};
  } catch (err) {
    return jsonifyError({err, message: 'Error adding comment'});
  }
};
