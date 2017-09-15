SELECT
  playerid,
  team,
  TRIM(tpposition) AS tpposition,
  TRIM(grouprl) AS grouprl,
  depthteam,
  playername,
  injuryweek,
  formationweek
FROM depthchart
WHERE (team = ${team} AND activeplayer AND weekgame = ${week} AND offensivelineweek)