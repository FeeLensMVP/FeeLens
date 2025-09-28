import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

export async function GET(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'subscribers.json');
    
    // Read subscribers from file
    const data = await fs.readFile(filePath, 'utf8').catch(() => '[]');
    const subscribers = JSON.parse(data);
    
    // Return subscribers with count
    return NextResponse.json({
      success: true,
      count: subscribers.length,
      subscribers: subscribers
    });
    
  } catch (err) {
    console.error('[subscribers] Error reading subscribers:', err);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to retrieve subscribers" 
    }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'subscribers.json');
    
    // Clear all subscribers
    await fs.writeFile(filePath, JSON.stringify([], null, 2));
    
    return NextResponse.json({
      success: true,
      message: "All subscribers cleared"
    });
    
  } catch (err) {
    console.error('[subscribers] Error clearing subscribers:', err);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to clear subscribers" 
    }, { status: 500 });
  }
}

