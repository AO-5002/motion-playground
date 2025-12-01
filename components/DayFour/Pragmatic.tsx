"use client";
import { type ReactElement } from "react";
import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import king from "./icons/king.png";
import pawn from "./icons/pawn.png";
import invariant from "tiny-invariant";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { motion, spring } from "motion/react";

export type Coord = [number, number];

export type PieceRecord = {
  type: PieceType;
  location: Coord;
};

export type PieceType = "king" | "pawn";

export function isEqualCoord(c1: Coord, c2: Coord): boolean {
  return c1[0] === c2[0] && c1[1] === c2[1];
}

export const pieceLookup: {
  [Key in PieceType]: (piece: PieceRecord) => ReactElement;
} = {
  king: (piece) => <King location={piece.location} />,
  pawn: (piece) => <Pawn location={piece.location} />,
};

type SquareProps = {
  location: Coord;
  children: React.ReactNode;
};

function Square({ location, children }: SquareProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, []);

  const isDark = (location[0] + location[1]) % 2 === 1;

  function getColor(isDraggedOver: boolean, isDark: boolean): string {
    if (isDraggedOver) {
      return "lightblue"; // or whatever color you want for drag hover
    }
    return isDark ? "lightgrey" : "white";
  }

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 1 }}
      animate={{
        scale: isDraggedOver ? 1.1 : 1,
        borderRadius: isDraggedOver ? 12 : 0,
        transition: { duration: 0.1 },
      }}
      className="w-full h-full flex justify-center items-center"
      style={{
        backgroundColor: getColor(isDraggedOver, isDark),
      }}
    >
      {children}
    </motion.div>
  );
}

function renderSquares(pieces: PieceRecord[]): ReactElement[] {
  const squares: ReactElement[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareCoord: Coord = [row, col];
      const piece = pieces.find((piece) =>
        isEqualCoord(piece.location, squareCoord)
      );

      squares.push(
        <Square key={`${row}-${col}`} location={squareCoord}>
          {piece && pieceLookup[piece.type](piece)}
        </Square>
      );
    }
  }

  return squares;
}

function Chessboard(): ReactElement {
  const pieces: PieceRecord[] = [
    { type: "king", location: [3, 2] },
    { type: "pawn", location: [1, 6] },
  ];
  return (
    <div className="grid grid-cols-8 grid-rows-8 w-[500px] h-[500px] border-[3px] border-[lightgrey]">
      {renderSquares(pieces)}
    </div>
  );
}

type PieceProps = {
  location: Coord;
  pieceType: PieceType;
  image: string | StaticImageData;
  alt: string;
};

function Piece({ location, pieceType, image, alt }: PieceProps): ReactElement {
  const ref = useRef<HTMLImageElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const src = typeof image === "string" ? image : image.src;

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ location, pieceType }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [location, pieceType]);

  return (
    <motion.img
      ref={ref}
      initial={{ opacity: 1 }}
      animate={{ opacity: dragging ? 0.4 : 1 }}
      className="w-[45px] h-[45px] p-1 rounded-md shadow-[1px_3px_3px_rgba(9,30,66,0.25),0px_0px_1px_rgba(9,30,66,0.31)] hover:bg-[rgba(168,168,168,0.25)]"
      src={src}
      alt={alt}
    />
  );
}

export function King({ location }: { location: Coord }): ReactElement {
  return <Piece location={location} pieceType="king" image={king} alt="King" />;
}

export function Pawn({ location }: { location: Coord }): ReactElement {
  return <Piece location={location} pieceType="pawn" image={pawn} alt="Pawn" />;
}

export default Chessboard;
