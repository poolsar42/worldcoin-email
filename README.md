# Worldcoin Email

💌 https://worldcoinemail.org

Anti-spam Chrome extension to send and receive verifiably human emails.

[Install extension](https://github.com/worldcoin-email/extension)

## How it works

When you send an email, you need to sign it with your Worldcoin Email signature. This signature is a proof that you are a human, and not a bot. The signature is generated by Worldcoin ID, and is unique to a human, but not identifiable.

## How to use

1. Login into https://worldcoinemail.org
2. Install Chrome extension [here](https://github.com/worldcoin-email/extension)
3. Visit https://worldcoinemail.org/auth if not opened automatically
4. Send an email, and it will be sent with a Worldcoin Email signature


When you receive an email from someone else, same Chrome extension will verify the signature, and if it is valid, the email will be delivered to your inbox. If the signature is invalid, the email will be delivered to your spam folder.


## Privacy concerns?

Worldcoin ID is impossible to correlate between users. We only store unique user ID provided by Worldcoin (nullifier hash), and a hash of each email sent. Neither recipient nor we have any way to identify user identity, read his emails or correlate his `from` addresses.

Chrome extension ONLY shares email hash under user unique WorldID session.
## Motivation

Spam in email. Allow people to verify that message was sent by a real person, and attach a reputation to that person

Non-users benefit from the same feature, seeing signature + verification link in the footer + reputation score for that sender at that link


## Architecture

- Chrome extension
    - Adds “Sign message” to Compose view at Gmail
    - Adds “Verified” checkmark in List view in your Inbox
    - Creates a folder out of verified messages
- Frontend
    - Sign in w/ World ID page
    - Verify Email
    - Downvote/Unsubscribe/Report/Block page
- Backend
    - Sign in and Sign up, save user info to db
    - Send Email, save nonce + email hash for each user
    - Verify Email, by hash return whether the email was indeed sent by given sub (user id)
    - ? Report/Unsubscribe, add downvote/block FROM user TO user, only allowed from signed in users
    - ? Report, open endpoint, anyone can add downvote for a specific user id, but this data is not incorporated directly into blocking system

## API Reference

### Unauthorized

- GET `/api/user/:sub` returns json with user reputation for a specific user id
- POST `/api/auth` standard OAuth flow, saves user into db or logs in after successful auth

### Authorized only

- GET `/api/email/:hash/verify` returns whether this hash is in the DB and whether specific user did send it
- POST `/api/email/:hash/:nonce/send` creates Email, only email hash and nonce is required
- ? PUT `/api/email/:hash/report` adds ReputationStrike (from specific user, to user)


## Development & Contributing

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
