import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { Photo } from "../types/pexels";
import { usePhotos } from "../hooks/usePhotos";
import { MasonryGrid } from "../components/MasonryGrid";
import { useState } from "react";

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
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

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const { photos, loading, error } = usePhotos(search);
  const navigate = useNavigate();

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
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search photos"
          />
        </SearchBarWrapper>
      </Header>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <MasonryGrid photos={photos} onPhotoClick={handlePhotoClick} />
      )}
    </PageContainer>
  );
};
