import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function GET() {
  return new Promise((resolve) => {
    exec('python3 app/api/voice-to-text/voice_to_text.py', (error, stdout) => {
      if (error) {
        resolve(NextResponse.json({ transcript: '[Speech failed]' }));
      } else {
        resolve(NextResponse.json({ transcript: stdout.trim() }));
      }
    });
  });
}
