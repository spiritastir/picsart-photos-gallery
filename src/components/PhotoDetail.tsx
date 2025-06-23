import styled from "styled-components";
import { extractTags } from "../utils/tags";
import type { Photo } from "../types/pexels";

interface PhotoDetailProps {
  photo: Photo;
  onBack: () => void;
}

const DetailContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(250, 250, 250, 0.98);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px 16px 16px;
  box-sizing: border-box;
  overflow-y: auto;
  z-index: 1000;
`;

const BackButton = styled.button`
  position: absolute;
  top: 32px;
  left: 32px;
  padding: 8px 20px;
  background-color: #05a081;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background-color: #00856f;
  }
`;

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SHARED_MAX_WIDTH = "600px";

const PhotoImage = styled.img`
  max-width: ${SHARED_MAX_WIDTH};
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 16px;
  margin: 32px 0 0 0;
  box-shadow: 0 4px 24px rgba(34, 34, 34, 0.12);
  background: #f0f0f0;
  display: block;
`;

const PhotoInfo = styled.div`
  color: #222;
  max-width: ${SHARED_MAX_WIDTH};
  width: 100%;
  padding: 32px 24px;
  background-color: #fff;
  border-radius: 16px;
  margin-top: 32px;
  box-shadow: 0 2px 12px rgba(34, 34, 34, 0.08);
`;

const Title = styled.h2`
  margin: 0 0 10px 0;
  font-size: 2rem;
  font-weight: 700;
  color: #222;
`;

const InfoRow = styled.div`
  margin: 14px 0;
  font-size: 1.1rem;
`;

const PhotographerLink = styled.a`
  color: #05a081;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #00856f;
    text-decoration: underline;
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 0 0;
`;

const Tag = styled.span`
  background: #e6f7f3;
  color: #05a081;
  font-size: 0.95rem;
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 500;
  letter-spacing: 0.02em;
`;

export const PhotoDetail: React.FC<PhotoDetailProps> = ({ photo, onBack }) => {
  const tags = extractTags(photo.alt);

  return (
    <DetailContainer>
      <BackButton onClick={onBack}>← Back to Grid</BackButton>
      <CenteredContent>
        <PhotoImage src={photo.src.large2x} alt={photo.alt} />
        <PhotoInfo>
          <Title>{photo.alt || "Untitled Photo"}</Title>
          {tags.length > 0 && (
            <TagsWrapper>
              {tags.map((tag, idx) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </TagsWrapper>
          )}
          <InfoRow>
            Photographer:{" "}
            <PhotographerLink
              href={photo.photographer_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {photo.photographer}
            </PhotographerLink>
          </InfoRow>
          <InfoRow>
            Dimensions: {photo.width} x {photo.height}
          </InfoRow>
          <InfoRow>
            <a
              href={photo.src.original}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Original Size
            </a>
          </InfoRow>
        </PhotoInfo>
      </CenteredContent>
    </DetailContainer>
  );
};
