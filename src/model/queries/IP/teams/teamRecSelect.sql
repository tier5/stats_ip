SELECT
  row_number()
  OVER (
    ORDER BY round((sum(ffp) / (sum(game) + 0.000001)) :: NUMERIC, 2) DESC )            AS rank,
  team                                                                                  AS team,
  sum(game)                                                                             AS gamesplayed,
  round((sum(ffp) / (sum(game) + 0.000001)) :: NUMERIC, 2)                              AS ffpg,
  sum(ptds) * 6 + sum(xppassconv) * 2                                                   AS points,
  round(((sum(ptds) * 6 + sum(xppassconv) * 2) / (sum(game) + 0.000001)) :: NUMERIC, 2) AS ppg,
  sum(patts)                                                                            AS passattempts,
  sum(pyrds)                                                                            AS passyards,
  sum(passc)                                                                            AS passcompletions,
  round((sum(pyrds) / (sum(patts) + 0.000001)) :: NUMERIC, 2)                           AS yardsperattm,
  round((sum(pyrds) / (sum(passc) + 0.000001)) :: NUMERIC, 2)                           AS yardspercomp,
  sum(ptds)                                                                             AS passtouchdowns,
  sum(xppassconv)                                                                       AS extrapointconversions,
  sum(firstdbpass)                                                                      AS firstdownsbypass

FROM nflt1h
--WHERE (nflseason IN ('2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008') AND
--       seasonweeks IN ('Weeks 1-6', 'Weeks 7-13', 'Weeks 14-16', 'NFL Playoffs') AND location IN ('HOME', 'AWAY') AND
--       playsurface IN ('Grass', 'Turf') AND inoutdoor IN ('Indoor', 'Outdoor') AND sng IN ('T', 'F') AND
--       pgs IN ('T', 'F') AND ctemp IN ('J', 'K', 'L', 'M', 'N', 'O') AND regseason IN (1, 3) AND
--       regweek IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17))
       WHERE ${where^}
GROUP BY team
ORDER BY row_number()
OVER (
  ORDER BY round((sum(ffp) / (sum(game) + 0.000001)) :: NUMERIC, 2) DESC )