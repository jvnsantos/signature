const scssStyles = (
  styles: string[]
): string => {
  return styles
    .filter(
      s =>
        !!s &&
        s !== 'undefined' &&
        s !== 'null'
    )
    .join(' ');
};

export default scssStyles;
