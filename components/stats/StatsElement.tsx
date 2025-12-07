import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { StatsElement as StatsElementType } from '../../types';

interface StatsElementProps {
    element: StatsElementType;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onUpdate?: (id: string, updates: Partial<StatsElementType>) => void;
    scale: number;
}

const StatsElement: React.FC<StatsElementProps> = ({ element, isSelected, onSelect, onUpdate, scale }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'STATS_ELEMENT',
        item: { id: element.id, type: element.type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [element.id, element.type]);

    // Resize Logic
    const handleResizeStart = (e: React.MouseEvent, direction: string) => {
        e.stopPropagation();
        if (!onUpdate) return;

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = element.width;
        const startHeight = element.height;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const dx = (moveEvent.clientX - startX) / scale;
            const dy = (moveEvent.clientY - startY) / scale;

            let newWidth = startWidth;
            let newHeight = startHeight;

            if (direction === 'se') {
                newWidth = Math.max(20, startWidth + dx);
                newHeight = Math.max(20, startHeight + dy);
            } else if (direction === 'e') {
                newWidth = Math.max(20, startWidth + dx);
            } else if (direction === 's') {
                newHeight = Math.max(20, startHeight + dy);
            }

            onUpdate(element.id, { width: newWidth, height: newHeight });
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const style: React.CSSProperties = {
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        transform: 'translate(-50%, -50%)',
        zIndex: element.zIndex,
        pointerEvents: element.locked ? 'none' : 'auto',
        opacity: element.opacity ?? 1,
        backgroundColor: element.backgroundColor || undefined,
        borderRadius: element.borderRadius ? `${element.borderRadius}px` : (element.backgroundColor ? '9999px' : '0px'),
        boxShadow: element.shadow ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
        transition: isDragging ? 'none' : 'background-color 0.2s, box-shadow 0.2s',
    };

    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.select();
        }
    }, [isEditing]);

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (element.type === 'text' && !element.locked) {
            setIsEditing(true);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setIsEditing(false);
        }
    };

    return (
        <div
            ref={(node) => { if (node) drag(node); }}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(element.id);
            }}
            onDoubleClick={handleDoubleClick}
            className={`
            absolute cursor-move select-none group will-change-transform 
            ${isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'} 
            ${!element.locked ? 'hover:brightness-110 active:scale-95' : ''}
          `}
            style={style}
        >
            {isSelected && !element.locked && !isEditing && (
                <>
                    <div className="absolute -inset-[2px] border border-neon/80 rounded-[inherit] pointer-events-none z-50 shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>

                    <div
                        className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-white border-2 border-neon rounded-full cursor-se-resize z-[60] shadow-md hover:scale-125 transition-transform flex items-center justify-center"
                        onMouseDown={(e) => handleResizeStart(e, 'se')}
                    >
                        <div className="w-1.5 h-1.5 bg-neon rounded-full"></div>
                    </div>

                    <div
                        className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-1.5 h-6 bg-white border border-neon rounded-full cursor-e-resize z-[60] shadow-md hover:scale-110 transition-transform"
                        onMouseDown={(e) => handleResizeStart(e, 'e')}
                    ></div>
                </>
            )}

            {!isSelected && !isEditing && element.dataKey && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-neon/90 text-black text-[9px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[60]">
                    {element.dataKey}
                </div>
            )}

            <div className={`relative w-full h-full flex ${element.type === 'text' ? 'items-center' : ''} justify-${element.textAlign || 'center'} overflow-hidden rounded-[inherit]`} >
                {element.type === 'text' ? (
                    isEditing ? (
                        <textarea
                            ref={textareaRef}
                            value={element.content}
                            onChange={(e) => onUpdate && onUpdate(element.id, { content: e.target.value })}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            style={{
                                fontSize: element.fontSize,
                                fontWeight: element.fontWeight,
                                color: element.color,
                                textAlign: element.textAlign,
                                lineHeight: 1.1,
                                fontFamily: 'Inter, sans-serif',
                                width: '100%',
                                height: '100%',
                                letterSpacing: '-0.02em',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                resize: 'none',
                                overflow: 'hidden'
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                fontSize: element.fontSize,
                                fontWeight: element.fontWeight,
                                color: element.color,
                                textAlign: element.textAlign,
                                whiteSpace: 'pre-wrap',
                                textShadow: element.shadow ? '2px 2px 4px rgba(0,0,0,0.8)' : 'none',
                                lineHeight: 1.1,
                                fontFamily: 'Inter, sans-serif',
                                width: '100%',
                                letterSpacing: '-0.02em',
                                pointerEvents: 'none'
                            }}
                        >
                            {element.content}
                        </div>
                    )
                ) : (
                    <img
                        src={element.content}
                        alt=""
                        className="w-full h-full object-cover pointer-events-none select-none"
                        style={{ borderRadius: 'inherit' }}
                        draggable={false}
                    />
                )}
            </div>
        </div>
    );
};

export default React.memo(StatsElement);
