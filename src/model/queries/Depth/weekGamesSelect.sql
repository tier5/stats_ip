--SELECT
-- team, vsteamweek
--FROM depthchart
--WHERE (activeplayer AND weekgame = ${week} AND offenseweek)
--GROUP BY team, vsteamweek

SELECT
  hometeamkey AS team,
  awayteamkey AS vsteamweek,
  weatherkey
FROM weathertable
WHERE (week = ${week} AND displayweek AND kickoffrow)
ORDER BY dateofgame ASC

