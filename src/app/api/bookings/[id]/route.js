import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const dbName = process.env.DB_NAME || 'booking-system';

export async function PUT(req, context) {
  const params = await context.params;
  const id = params?.id;
  const { status } = await req.json();

  if (!status) {
    return new Response(
      JSON.stringify({ message: 'Status is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const bookingsCollection = db.collection('bookings');

    let queryId;
    try {
      queryId = new ObjectId(id);
    } catch {
      return new Response(
        JSON.stringify({ message: 'Invalid booking ID format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await bookingsCollection.updateOne(
      { _id: queryId },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Booking not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Booking status updated successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating booking status:', error);
    return new Response(
      JSON.stringify({ message: 'Error updating booking status', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PATCH(req, context) {
  return PUT(req, context);
}

export async function DELETE(req, context) {
  const params = await context.params;
  const id = params?.id;

  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const bookingsCollection = db.collection('bookings');

    let queryId;
    try {
      queryId = new ObjectId(id);
    } catch {
      return new Response(
        JSON.stringify({ message: 'Invalid booking ID format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await bookingsCollection.deleteOne({ _id: queryId });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: 'Booking not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Booking deleted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting booking:', error);
    return new Response(
      JSON.stringify({ message: 'Error deleting booking', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
