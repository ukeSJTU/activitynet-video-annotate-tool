"use client";

import { DraftSegment } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowUpCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface DraftSegmentsProps {
  drafts: DraftSegment[];
  onDelete: (index: number) => void;
  onUse: (timestamp: number) => void;
  onDraftClick: (timestamp: number) => void;
}

export function DraftSegments({ drafts, onDelete, onUse, onDraftClick }: DraftSegmentsProps) {
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Click on any draft timestamp to jump to that point in the video. Use the arrow button to create a segment at that timestamp.
        </AlertDescription>
      </Alert>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp (s)</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drafts.map((draft, index) => (
            <TableRow 
              key={index}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onDraftClick(draft.timestamp)}
            >
              <TableCell>{draft.timestamp.toFixed(2)}</TableCell>
              <TableCell>{draft.note || '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUse(draft.timestamp);
                    }}
                    title="Use this timestamp to create a segment"
                  >
                    <ArrowUpCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(index);
                    }}
                    title="Delete this draft timestamp"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}