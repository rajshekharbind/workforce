import clientPromise from '@/lib/mongodb';

const dbName = process.env.DB_NAME || 'booking-system';

// Handle GET requests (Fetching all bookings)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const bookingsCollection = db.collection('bookings');

    const bookings = await bookingsCollection.find({}).sort({ createdAt: -1 }).toArray();
    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return new Response(JSON.stringify({ message: 'Error fetching bookings', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Handle POST requests (Creating a new booking)
export async function POST(req) {
  try {
    const data = await req.json();
    const {
      customerName,
      workerType,
      workDescription,
      quantity,
      selectedSkill,
      location,
      phone,
      urgency,
      bookingDate,
      timeSlot,
      estimatedPrice,
    } = data;

    if (!workerType || !workDescription || !location || !phone) {
      return new Response(
        JSON.stringify({ message: 'Worker type, description, location and phone are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const bookingsCollection = db.collection('bookings');

    const newBooking = {
      customerName: customerName || 'Valued Customer',
      workerType: workerType || 'unskilled',
      workDescription,
      quantity: quantity ? parseInt(quantity, 10) || 1 : 1,
      selectedSkill: selectedSkill || (workerType === 'unskilled' ? 'General Labor' : 'General Skilled'),
      location,
      phone,
      urgency: urgency || 'Standard',
      bookingDate: bookingDate || new Date().toISOString().split('T')[0],
      timeSlot: timeSlot || 'Morning (8 AM - 12 PM)',
      estimatedPrice: estimatedPrice || null,
      status: 'Pending',
      createdAt: new Date(),
    };

    const result = await bookingsCollection.insertOne(newBooking);

    return new Response(
      JSON.stringify({ bookingId: result.insertedId, message: 'Booking created successfully' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error saving booking', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
