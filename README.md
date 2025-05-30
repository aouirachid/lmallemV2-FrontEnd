# Lmallem Frontend

This is the frontend application for the Lmallem platform, built with [Angular](https://angular.io/) version 18.0.7.

## Project Overview

Lmallem is a platform that connects clients with handymen and service providers. The frontend application provides a user interface for:
- Client management
- Service provider (handyman) management
- Order management
- Category management
- Admin dashboard
- Authentication and authorization

## Prerequisites

- Node.js (LTS version recommended)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. Navigate to `http://localhost:4200/` in your browser

## Project Structure

The application is organized into several key modules:
- `/src/app/admin` - Admin dashboard and management features
- `/src/app/auth` - Authentication and authorization
- `/src/app/client` - Client-related features
- `/src/app/handyMan` - Handyman/service provider features
- `/src/app/orders` - Order management
- `/src/app/category` - Category management
- `/src/app/services` - Shared services
- `/src/app/Models` - Data models and interfaces

## Development

### Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Building

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Testing

- Run `ng test` to execute unit tests via [Karma](https://karma-runner.github.io)
- Run `ng e2e` to execute end-to-end tests (requires additional testing package)

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI Overview](https://angular.dev/tools/cli)
- [Angular Material](https://material.angular.io/) (if used in the project)

## Support

For any issues or questions, please contact the development team.
