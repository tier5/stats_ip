SELECT week AS week,
    TO_CHAR(gamedate, 'YYYY-MM-DD') AS gamedate,
    age AS age,
    concat(lpad(hhour::text, 2, '0'), ':', lpad(mminute::text, 2, '0')) AS kickofftime,
    oppo,
    result AS result,
    ffp AS ffp, --Fantasy Points
    prank AS prank, --Position Rank
    tpposition AS position,
    player,


    rectd, --receiving touchdowns
    tottd, --total touchdowns
    reyd, --receiving yards
    receps, --receptions
    rtar, --targets
    (rushy + passyd + reyd + puntryd + kickryd) as apy, --all purpose yards
    rushy, --rush yards
    round( (reyd / (rtar + 0.000001))::numeric, 2) AS reydperattm,

    passtd AS passtd,
    rushtd,
    passyd AS passyd,
    passattm AS passattm,
    passc AS passc,
    round( (passc / (passattm + 0.000001))::numeric, 2) * 100 AS compper,
    intercepts AS intercepts,
    rushy AS rushy,
    round( (passyd / (passc + 0.000001))::numeric, 2) AS yardspercomp,
    round( (passyd / (passattm + 0.000001))::numeric, 2) AS yardsperattm,
    sacks AS sacks,
    carries,
    round( (rushy / (carries + 0.000001))::numeric, 2) AS yardspercarry,
    round( (reyd / (receps + 0.000001))::numeric, 2) AS yardsperreception,
    round( (passyd / (passattm + 0.000001))::numeric, 2) AS passyardsperattm,
    twentyp,
    fortyp AS fortyp,
    longy AS longy,
    fum AS fum,
    fuml AS fuml,

    fgatt,
    fgm,
    round( (fgm / (fgatt + 0.000001))::numeric, 2) * 100 AS fgper,
    pattm,
    pamade,
    round( (pamade / (pattm + 0.000001))::numeric, 2) * 100 AS patper,
    fgm AS f10p,
    (f20 + f30 + f40 + f50p) AS f20p,
    (f30 + f40 + f50p) AS f30p,
    (f40 + f50p) AS f40p,
    f50p,
    f60p,
    longfg,
    fgblocked,
    pablocked

FROM ${table^}
WHERE ${where^}
ORDER BY ${orderBy^} week
${limit^}