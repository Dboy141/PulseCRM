# PulseCRM System Architecture

## Overview

PulseCRM will initially be developed as a modular monolith.

This means the backend will run as one application, but each major feature will be separated into its own module. This approach keeps development and deployment simple while allowing the application to remain organised and scalable.

## High-Level Architecture

```text
Users
  |
  v
Next.js Frontend
  |
  v
FastAPI Backend
  |
  +----------------------+
  |                      |
  v                      v
PostgreSQL Database   Redis Queue
  |                      |
  v                      v
Supabase Storage     Background Worker
                         |
                         v
              WhatsApp, Meta and Email APIs