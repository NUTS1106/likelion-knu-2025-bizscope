export const radiusToLevel = (m?: number) => {
    const r = m ?? 500;                
    if (r <=   300) return 3;
    if (r <=   600) return 4;
    if (r <=  1200) return 5;
    if (r <=  2400) return 6;
    if (r <=  4800) return 7;
    if (r <=  9600) return 8;
    if (r <= 19200) return 9;
    if (r <= 38400) return 10;
    return 11;                            
  };