---
name: telegram-web-automator
description: "Automate Telegram Web flows with the browser tool (start browser, visit web.telegram.org, login via QR, open a named chat, send text, read the latest replies, and capture screenshots). Trigger this skill whenever a user explicitly asks for a Telegram Web interaction or a proof/summary of a chat exchange."
---

# Telegram Web Automator

## Purpose
Use this skill when the user needs the assistant to:
- open Telegram Web via the browser tool,
- navigate to a specific chat (bot or person),
- send a user-provided message,
- read or capture the latest reply,
- and provide a screenshot or summary of what appeared.

## Preconditions
1. The browser tool must be able to start and attach to a Chrome instance (`browser.start`).
2. If Telegram Web demands login, request the user to scan the QR code, keep the session alive, and confirm when logged in.
3. The user must tell you which chat (by username, bot name, or label) to open and what text to send. Include any follow-up instructions if a reply is expected.

## Workflow
1. **Launch browser** using `browser.start` with the `openclaw` profile.
2. **Open Telegram Web** (`browser.open targetUrl=https://web.telegram.org/a/`) and verify the QR code/login prompt. If login is required, pause and ask the user to connect. Continue once the session is authenticated.
3. **Locate the chat**: use `browser.act` to type the chat name in the search box (aria ref to `Search`) or click the chat from the list. Confirm the URL fragment contains the chat `#<chat_id>`.
4. **Send the message**: focus the message textbox, type the supplied text, and click the send button. Wait for the UI to show the outgoing message (use `browser.snapshot` if necessary to double-check).
5. **Capture reply(s)**: wait until the partner responds (if expected) or capture the current last message. Use `browser.snapshot`/`screenshot` to grab visible chat history for documentation.
6. **Report back**: summarize what was posted, quote any relevant reply text, and attach the screenshot image file reference.

## Troubleshooting
- If `browser.start` cannot attach because Chrome is already running with incompatible flags, ask the user to restart Chrome with `--remote-debugging-port=9222` and provide a non-default `--user-data-dir` (or allow the OpenClaw helper to launch a new Chrome instance).
- When Telegram reroutes you to login repeatedly, remind the user that a fresh QR login is needed and that the browser session must remain open.
- Capture both the text summary and the screenshot until the user confirms they have the proof they wanted.

## Example Triggers
- “Go into Telegram Web, open the `openclawMac` chat, say `Hi`, and show me the response.”
- “Open Telegram, find @somebot, send `status`, and screenshot the reply.”
- “Use the browser to chat with `mypcbot` and include both the message and a screenshot in your report.”

Use this skill for any request needing deterministic Telegram Web navigation so the assistant remembers the right sequence of browser calls every time.
