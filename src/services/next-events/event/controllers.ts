import {jsonifyError} from '@/lib/helpers';
import Event, {IEvent} from './event-model';
import isEmail from 'validator/lib/isEmail';
import {nextDBConnect} from '@/lib/db';

export const getEvent = async (eventId: string) => {
  try {
    await nextDBConnect();
    const event = (await Event.findById(eventId)) as IEvent;
    if (!event) return jsonifyError({message: 'Event not found', code: 404});
    const eventDoc = event._doc;
    // Convert ObjectId to string for comments
    const comments = eventDoc.comments.map((comment: any) => ({
      ...comment._doc,
      _id: comment._id.toString(),
    }));
    return {
      status: 'success',
      message: 'Event retrieved successfully',
      code: 200,
      data: {...event._doc, comments} as IEvent,
    };
  } catch (err) {
    console.error(err);
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
