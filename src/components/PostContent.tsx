function youtubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function isImageUrl(url: string): boolean {
  return /^https?:\/\/\S+\.(png|jpe?g|gif|webp|avif|svg)(\?\S*)?$/i.test(url.trim());
}

/**
 * Renders blog content line by line. A line that is only a YouTube link
 * becomes an embedded player, a line that is only an image URL becomes an
 * image, and everything else is a paragraph.
 */
export function PostContent({ content }: { content: string }) {
  const lines = content.split("\n").filter((l) => l.trim());

  return (
    <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        const yt = youtubeId(trimmed);
        if (yt) {
          return (
            <div
              key={i}
              className="aspect-video w-full overflow-hidden rounded-2xl border border-border/60"
            >
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${yt}`}
                title="Vídeo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          );
        }
        if (isImageUrl(trimmed)) {
          return (
            <img
              key={i}
              src={trimmed}
              alt=""
              className="w-full rounded-2xl border border-border/60 object-cover"
            />
          );
        }
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}
