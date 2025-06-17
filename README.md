# Photos Gallery

A responsive Single Page Application (SPA) that showcases photos from the Pexels API using a virtualized masonry grid layout.

## Features

- Virtualized masonry grid layout for efficient rendering of large photo sets
- Responsive design that works across all device sizes
- **Search functionality to find photos by keyword**
- Detailed photo view with additional information
- Smooth transitions and animations
- Optimized performance with lazy loading and virtualization
- TypeScript for type safety and better developer experience

## Search Functionality

- Use the search bar at the top of the page to find photos by keyword.
- The grid updates dynamically to show relevant results from the Pexels API as you type.
- Clicking a photo from search results will show its details, and you can return to your search results with the back button.

## Technical Implementation

### Virtualized Masonry Grid

- Custom implementation without external libraries
- Efficient rendering using windowing technique
- Dynamic column calculation based on container width
- Maintains aspect ratios of images
- Smooth scrolling and performance optimization

### Performance Optimizations

- Image lazy loading
- Virtualized rendering
- Memoized calculations
- Efficient DOM updates
- Optimized asset loading

### Tech Stack

- React 18
- TypeScript
- React Router v6
- Styled Components
- Vite (for build tooling)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Pexels API key:
   ```
   VITE_PEXELS_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Design Decisions

1. **Custom Masonry Grid Implementation**

   - Chose to implement the masonry grid from scratch to have full control over performance optimizations
   - Implemented virtualization to handle large sets of images efficiently
   - Dynamic column calculation based on viewport width

2. **Performance Considerations**

   - Used React.memo and useMemo for preventing unnecessary re-renders
   - Implemented lazy loading for images
   - Virtualized rendering to only render visible items
   - Optimized asset loading and caching

3. **TypeScript Implementation**

   - Strong typing throughout the application
   - Interface definitions for API responses
   - Type safety for component props
   - Generic types where appropriate

4. **Styling Approach**
   - Used styled-components for CSS-in-JS
   - Responsive design with mobile-first approach
   - Consistent theming and styling patterns
   - Smooth transitions and animations

## Testing

Run the test suite:

```bash
npm test
```
