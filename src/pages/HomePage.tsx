import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import type { Photo } from "../types/pexels";
import { usePhotos } from "../hooks/usePhotos";
import { useSearch } from "../hooks/useSearch";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { MasonryGrid } from "../components/MasonryGrid";
import { API_CONFIG } from "../constants";

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: #fff;
  padding: 32px 0 24px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin: 0;
  color: #222;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-align: center;
  font-family: "Inter", sans-serif;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 320px;
  padding: 10px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  background: #fff;
  color: #222;
  outline: none;
  transition: border 0.2s;
  box-shadow: 0 1px 4px rgba(34, 34, 34, 0.04);

  &:focus {
    border: 1.5px solid #05a081;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #666;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #e74c3c;
  font-size: 0.9rem;
`;

const LoadMoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 48px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #05a081;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: ${spin} 1s linear infinite;
  display: inline-block;
  margin-left: 10px;
`;

const LoadMoreButton = styled.button`
  margin: 32px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  font-size: 1rem;
  border-radius: 8px;
  background: #05a081;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
  &:disabled {
    background: #b2dfd6;
    cursor: not-allowed;
  }
`;

export const HomePage = () => {
  const { search, debouncedSearch, handleSearchChange } = useSearch({
    debounceMs: API_CONFIG.SEARCH_DEBOUNCE_MS,
  });

  const { photos, loading, loadingMore, error, hasMore, loadMore } =
    usePhotos(debouncedSearch);
  const navigate = useNavigate();

  useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading: loadingMore,
    threshold: API_CONFIG.INFINITE_SCROLL_THRESHOLD,
  });

  const handlePhotoClick = (photo: Photo) => {
    navigate(`/photo/${photo.id}`, { state: { photo } });
  };

  return (
    <PageContainer>
      <Header>
        <Title>Photo Gallery</Title>
        <SearchBarWrapper>
          <SearchInput
            type="text"
            placeholder="Search photos..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            aria-label="Search photos"
          />
        </SearchBarWrapper>
      </Header>

      {loading && <LoadingSpinner>Loading photos...</LoadingSpinner>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && photos.length > 0 && (
        <MasonryGrid photos={photos} onPhotoClick={handlePhotoClick} />
      )}

      {!loading && !error && photos.length === 0 && (
        <LoadingSpinner>No photos found</LoadingSpinner>
      )}

      <LoadMoreButtonWrapper>
        {!loading && hasMore && (
          <LoadMoreButton onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? (
              <>
                Loading
                <Spinner />
              </>
            ) : (
              "Load More"
            )}
          </LoadMoreButton>
        )}
      </LoadMoreButtonWrapper>
    </PageContainer>
  );
};
