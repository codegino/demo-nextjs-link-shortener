import {NextResponse} from 'next/server';
import {sql} from '@vercel/postgres';

export const GET = async (req, {params}) => {
  const {rows} =
    await sql`SELECT * FROM links WHERE alias=${params.slug} LIMIT 1`;

  if (rows.length === 0) {
    return new Response(`<h1>/${params.slug} is not in our record</h1>`, {
      status: 400,
      headers: {
        'content-type': 'text/html',
      },
    });
  }

  if (rows[0]) {
    await sql`UPDATE links SET visit_count = visit_count + 1 WHERE alias = ${params.slug}`;
  }

  return NextResponse.redirect(rows[0].target, 302);
};
