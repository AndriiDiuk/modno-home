import React from "react";

interface RichTextProps {
  content: any;
  className?: string;
}

export const RichText: React.FC<RichTextProps> = ({ content, className }) => {
  if (!content) return null;

  // Lexical saves content in a 'root' property
  const nodes = content.root?.children || [];

  return (
    <div
      className={`prose prose-sm md:prose-base max-w-none text-black leading-relaxed space-y-4 ${className || ""}`}
    >
      {nodes.map((node: any, index: number) => {
        if (node.type === "paragraph") {
          return (
            <p key={index}>
              {node.children?.map((child: any, i: number) => (
                <span key={i} className={child.format === 1 ? "font-bold" : ""}>
                  {child.text}
                </span>
              ))}
            </p>
          );
        }
        if (node.type === "heading") {
          const Tag = node.tag as keyof JSX.IntrinsicElements;
          return (
            <Tag key={index} className='font-bold text-xl mt-6 mb-2'>
              {node.children?.map((child: any, i: number) => child.text)}
            </Tag>
          );
        }
        if (node.type === "list") {
          const ListTag = node.listType === "bullet" ? "ul" : "ol";
          return (
            <ListTag key={index} className='list-disc pl-6 space-y-1'>
              {node.children?.map((listItem: any, i: number) => (
                <li key={i}>
                  {listItem.children?.map(
                    (child: any, j: number) => child.text,
                  )}
                </li>
              ))}
            </ListTag>
          );
        }
        return null;
      })}
    </div>
  );
};
