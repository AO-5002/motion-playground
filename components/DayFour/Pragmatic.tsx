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

// Type guard to check if data is a valid Coord
function isCoord(data: unknown): data is Coord {
  return (
    Array.isArray(data) &&
    data.length === 2 &&
    typeof data[0] === "number" &&
    typeof data[1] === "number"
  );
}

// Type guard to check if data is a valid PieceType
function isPieceType(data: unknown): data is PieceType {
  return data === "king" || data === "pawn";
}

// Function to determine if a move is valid
function canMove(
  from: Coord,
  to: Coord,
  pieceType: PieceType,
  targetPiece?: PieceType
): boolean {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;

  // Can't move to the same square
  if (isEqualCoord(from, to)) {
    return false;
  }

  // Calculate movement deltas
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  if (pieceType === "king") {
    // King can move one square in any direction
    return rowDiff <= 1 && colDiff <= 1;
  }

  if (pieceType === "pawn") {
    // Pawn can move forward one square (assuming pawns move "down" the board)
    // Can't capture with forward move (simplified rules)
    if (fromCol === toCol && toRow === fromRow + 1 && !targetPiece) {
      return true;
    }

    // Pawn can capture diagonally forward
    if (colDiff === 1 && toRow === fromRow + 1 && targetPiece) {
      return true;
    }

    return false;
  }

  return false;
}

type SquareProps = {
  pieces?: PieceType;
  location: Coord;
  children: React.ReactNode;
};

type HoveredState = "idle" | "validMove" | "invalidMove";

function Square({ pieces, location, children }: SquareProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<HoveredState>("idle");

  // Define isDraggedOver based on state
  const isDraggedOver = state === "validMove";

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      onDragEnter: ({ source }) => {
        // Add proper validation
        if (
          !isCoord(source.data.location) ||
          !isPieceType(source.data.pieceType)
        ) {
          return;
        }

        if (
          canMove(source.data.location, location, source.data.pieceType, pieces)
        ) {
          setState("validMove");
        } else {
          setState("invalidMove");
        }
      },

      onDragLeave: () => setState("idle"),
      onDrop: () => setState("idle"),
    });
  }, [location, pieces]); // Add dependencies

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
