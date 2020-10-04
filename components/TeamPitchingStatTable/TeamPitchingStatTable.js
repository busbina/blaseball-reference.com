import { commonPitchingStatColumns } from "components/PitchingStatTable/PitchingStatTable";

import { Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import Table from "components/Table";
import { Tooltip } from "@chakra-ui/core";

export default function TeamPitchingStatTable({
  isPostseason = false,
  pitchingStats,
  season,
  statTargetName,
}) {
  if (
    !pitchingStats ||
    (!isPostseason &&
      (!pitchingStats.seasons ||
        Object.keys(pitchingStats.seasons).length === 0)) ||
    (isPostseason &&
      (!pitchingStats.postseasons ||
        Object.keys(pitchingStats.postseasons).length === 0))
  ) {
    return null;
  }

  const data = React.useMemo(() => {
    const seasons = isPostseason
      ? pitchingStats.postseasons
      : pitchingStats.seasons;

    if (!season) {
      const season = Object.keys(seasons).sort().pop();
    }

    return seasons[season].map((player) => {
      return {
        ...player,
        season,
      };
    });
  }, [isPostseason, season, statTargetName]);

  const columns = React.useMemo(
    () =>
      [
        {
          accessor: "name",
          Header: (
            <Tooltip hasArrow label="Team" placement="top">
              Player
            </Tooltip>
          ),
          Cell: ({ row, value }) => {
            return row.original?.slug ? (
              <NextLink
                href="/players/[playerSlug]"
                as={`/players/${row.original.slug}`}
                passHref
              >
                <Link>{value}</Link>
              </NextLink>
            ) : null;
          },
        },
      ].concat(commonPitchingStatColumns()),
    [isPostseason, season, statTargetName]
  );

  return (
    <Table columns={columns} data={data}>
      <Flex alignContent="baseline" justifyContent="space-between">
        <Table.Heading level="h3" size="sm">
          {"Team Pitching Stats"}
        </Table.Heading>
        <Flex alignItems="center">
          <Table.CSVExport
            filename={`${statTargetName} Regular Season Pitching Stats.csv`}
          />
        </Flex>
      </Flex>
      <Table.Content />
    </Table>
  );
}
