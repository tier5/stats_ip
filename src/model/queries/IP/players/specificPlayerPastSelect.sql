SELECT nflseason,
age,
array_to_string(array_agg(distinct team),', ') AS teams,
tpposition AS position,
sum(gplayed) AS gamesplayed,
sum(ffp) AS totffp,
prank,
round( (sum(ffp) / (sum(gplayed) + 0.000001))::numeric, 2) AS fppg,
max(ffp) AS ceiling,
min(ffp) FILTER (WHERE gplayed = 1) AS pfloor,

sum(passtd) AS passtds,
sum(tottd) AS tottds,
sum(passyd) AS passyds,
sum(passattm) AS passattms,
sum(passc) AS passcomps,
round( (sum(passc) / (sum(passattm) + 0.000001))::numeric, 2) * 100 as compper,
sum(intercepts) AS intercepts,
sum(rushy) AS rushy,
round( (sum(passyd) / (sum(gplayed) + 0.000001))::numeric, 2) AS passydspergame,
round( (sum(passyd) / (sum(passc) + 0.000001))::numeric, 2) AS passydspercomp,
sum(rushtd) AS rushtds,
sum(rushy) AS totrushy,
sum(reyd) AS totreyd,
sum(receps) AS totreceps,
sum(rtar) AS targets,
sum(carries) AS totcarries,
round( (sum(rushy) / (sum(carries) + 0.000001))::numeric, 2) AS yardspercarry,
round( (sum(reyd) / (sum(receps) + 0.000001))::numeric, 2) AS yardsperrecep,
round( (sum(passyd) / (sum(passattm) + 0.000001))::numeric, 2) AS passydsperattm,
sum(rectd) AS totrectd,
(sum(rushy) + sum(passyd) + sum(reyd) + sum(puntryd) + sum(kickryd)) as totapy,
round( (sum(reyd) / (sum(receps) + 0.000001))::numeric, 2) AS yardspercomp,
round( (sum(reyd) / (sum(rtar) + 0.000001))::numeric, 2) AS yardspertar,

sum(fgatt) AS fgatt,
sum(fgm) AS fgm,
round( (sum(fgm) / (sum(fgatt) + 0.000001))::numeric, 2) * 100 AS fgper,
sum(pattm) AS pattm,
sum(pamade) AS pamade,
round( (sum(pamade) / (sum(pattm) + 0.000001))::numeric, 2) * 100 AS patper,
sum(fgm) AS f10p,
(sum(f20) + sum(f30) + sum(f40) + sum(f50p)) AS f20p,
(sum(f30) + sum(f40) + sum(f50p)) AS f30p,
(sum(f40) + sum(f50p)) AS f40p,
sum(f50p) AS f50p,
sum(f60p) AS f60p,
max(longfg) AS longfg,
sum(fgblocked) AS fgblocked,
sum(pablocked) AS pablocked,

sum(twentyp) as twentyps,
sum(fortyp) AS fortyps,
max(longy) AS longest,
sum(fum) AS fum

FROM ${table^}
WHERE ${where^}
GROUP BY nflseason, tpposition, age, prank
ORDER BY ${orderBy^} nflseason