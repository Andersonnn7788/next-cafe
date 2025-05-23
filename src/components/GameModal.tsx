
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BeanHunt from './games/BeanHunt';
import PodMatch from './games/PodMatch';

interface GameModalProps {
  gameId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const GameModal = ({ gameId, isOpen, onClose }: GameModalProps) => {
  const getGameTitle = () => {
    switch (gameId) {
      case 'bean-hunt':
        return 'Bean Hunt';
      case 'pod-match':
        return 'Pod Match';
      case 'brew-master':
        return 'Brew Master';
      default:
        return 'Mini Game';
    }
  };
  
  const renderGame = () => {
    switch (gameId) {
      case 'bean-hunt':
        return <BeanHunt />;
      case 'pod-match':
        return <PodMatch />;
      case 'brew-master':
        return (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-lg font-medium text-coffee-dark">Coming Soon</h3>
            <p className="text-sm text-muted-foreground mt-2">
              This game is still brewing and will be available soon!
            </p>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getGameTitle()}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {renderGame()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;
