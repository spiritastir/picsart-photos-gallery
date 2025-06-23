# Photos Gallery

A responsive Single Page Application (SPA) that showcases photos from the Pexels API using a virtualized masonry grid layout with infinite scrolling.

## Features

- **Infinite scrolling** for seamless photo browsing
- Virtualized masonry grid layout for efficient rendering of large photo sets
- Responsive design that works across all device sizes
- **Search functionality to find photos by keyword**
- Detailed photo view with additional information
- Smooth transitions and animations
- Optimized performance with lazy loading and virtualization
- TypeScript for type safety and better developer experience

## Infinite Scrolling

The application features a sophisticated infinite scrolling implementation that provides a seamless browsing experience:

### How It Works

- **Automatic Loading**: As you scroll down, new photos are automatically loaded when you reach within 200px of the bottom
- **Dual Loading Methods**:
  - **Automatic**: Triggered by scrolling near the bottom
  - **Manual**: "Load More" button for explicit loading
- **Smart State Management**: Prevents duplicate requests and handles loading states gracefully
- **Search Integration**: Works seamlessly with search functionality - infinite scroll respects search results

### Technical Implementation

#### Infinite Scroll Hook (`useInfiniteScroll`)

```typescript
useInfiniteScroll({
  onLoadMore: loadMore,
  hasMore,
  loading: loadingMore,
  threshold: 200, // px from bottom to trigger loading
});
```

#### Key Features

- **Threshold-based triggering**: Loads content 200px before reaching the bottom
- **Debounced scroll handling**: Prevents excessive API calls during rapid scrolling
- **Loading state management**: Shows loading indicators and prevents duplicate requests
- **Error handling**: Graceful fallback when loading fails
- **Memory efficient**: Only keeps necessary photos in memory

#### Performance Optimizations

- **Pagination**: Loads 20 photos per page to balance performance and user experience
- **Debounced search**: 500ms delay prevents excessive API calls during typing
- **Virtualized rendering**: Only renders visible photos for optimal performance
- **Lazy loading**: Images load only when they come into view

### User Experience

- **Seamless browsing**: No pagination buttons or page breaks
- **Loading indicators**: Visual feedback during photo loading
- **Error recovery**: Clear error messages and retry options
- **Search persistence**: Infinite scroll works with search results
- **Responsive design**: Works perfectly on all device sizes

## Search Functionality

- Use the search bar at the top of the page to find photos by keyword.
- The grid updates dynamically to show relevant results from the Pexels API as you type.
- **Infinite scrolling works with search results** - you can continuously load more search results
- Clicking a photo from search results will show its details, and you can return to your search results with the back button.

## Technical Implementation

### Virtualized Masonry Grid

- Custom implementation without external libraries
- Efficient rendering using windowing technique
- Dynamic column calculation based on container width
- Maintains aspect ratios of images
- Smooth scrolling and performance optimization

### Performance Optimizations

- **Infinite scrolling with virtualization**: Combines the best of both worlds
- Image lazy loading
- Virtualized rendering
- Memoized calculations
- Efficient DOM updates
- Optimized asset loading
- Debounced scroll and search handlers

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

1. **Infinite Scrolling Implementation**

   - **Custom hook approach**: `useInfiniteScroll` for reusability and separation of concerns
   - **Threshold-based triggering**: 200px from bottom provides smooth user experience
   - **Dual loading methods**: Automatic (scroll) and manual (button) for flexibility
   - **State management**: Proper loading states prevent duplicate requests
   - **Error handling**: Graceful degradation when API calls fail

2. **Custom Masonry Grid Implementation**

   - Chose to implement the masonry grid from scratch to have full control over performance optimizations
   - Implemented virtualization to handle large sets of images efficiently
   - Dynamic column calculation based on viewport width
   - **Integrated with infinite scrolling** for seamless experience

3. **Performance Considerations**

   - Used React.memo and useMemo for preventing unnecessary re-renders
   - Implemented lazy loading for images
   - Virtualized rendering to only render visible items
   - **Debounced infinite scroll** to prevent excessive API calls
   - Optimized asset loading and caching

4. **TypeScript Implementation**

   - Strong typing throughout the application
   - Interface definitions for API responses
   - Type safety for component props
   - Generic types where appropriate

5. **Styling Approach**
   - Used styled-components for CSS-in-JS
   - Responsive design with mobile-first approach
   - Consistent theming and styling patterns
   - Smooth transitions and animations

## Testing

Run the test suite:

```bash
npm test
```

## API Integration

The application integrates with the Pexels API to provide:

- **Curated photos**: Initial gallery of high-quality photos
- **Search functionality**: Find photos by keywords
- **Pagination**: Efficient loading of large photo sets
- **Photo details**: Complete metadata for each photo

### API Endpoints Used

- `GET /curated` - Get curated photos for the main gallery
- `GET /search` - Search photos by keyword
- Both endpoints support pagination with `page` and `per_page` parameters

## Performance Metrics

- **Initial load**: 20 photos loaded on first visit
- **Scroll threshold**: 200px from bottom triggers loading
- **Search debounce**: 500ms delay prevents excessive API calls
- **Virtualization**: Only renders visible photos (typically 20-40 at a time)
- **Memory efficient**: Photos are loaded and unloaded as needed
