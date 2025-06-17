import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { PhotoDetail } from "../components/PhotoDetail";
import { usePhotoDetail } from "../hooks/usePhotoDetail";
import type { Photo } from "../types/pexels";

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
`;

export const PhotoDetailPage = () => {
  const { photoId } = useParams<{ photoId: string }>();
  const location = useLocation();
  const statePhoto = (location.state as { photo?: Photo })?.photo;
  const { photo, loading, error } = usePhotoDetail(photoId, statePhoto);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !photo) {
    return <div>{error || "Photo not found"}</div>;
  }

  return (
    <PageContainer>
      <PhotoDetail photo={photo} onBack={handleBack} />
    </PageContainer>
  );
};
