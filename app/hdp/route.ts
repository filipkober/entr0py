import fs from 'fs'

export function GET(request: Request) {
    // current directory is app/hdp
    // image is in img/ directory
    const image_path = './img/05824935784.png'

    const file = fs.readFileSync(image_path);

    const headers = { 
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="05824935784.png"'
    };

    return new Response(file, { headers });
}