import { GalleryLayout, Gallery } from "./GalleryLayout";

/*
A row of floating 3D cards that react to mouse movement and can be clicked to expand/focus.
What you'll build:

3D cards that gently float/rotate in space
Mouse parallax effect (cards tilt toward cursor)
Click a card → it moves forward and expands
Framer Motion handles the layout transitions
Three.js Fiber handles the 3D rendering
 */

function CardGallery() {
  return (
    <GalleryLayout>
      <Gallery />
    </GalleryLayout>
  );
}

export default CardGallery;
