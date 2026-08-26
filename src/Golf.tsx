import { qualifier } from "./golf-data";
import {
  computeStandings,
  formatStatus,
  formatToPar,
  isUnderParRound,
  isUnderToPar,
} from "./golf-standings";

const standings = computeStandings();

export default function Golf() {
  return (
    <div className="golf-page">
      <a className="skip-link" href="#main">Saltar al contenido</a>
      <header className="golf-masthead">
        <p className="wordmark">Ectropa</p>
        <h1>{qualifier.event}</h1>
        <p className="golf-dek">{qualifier.dek}</p>
        <p className="golf-rules">
          Mejores {qualifier.bestOf} de {qualifier.dates.length} · {qualifier.autoQualify} cupos automáticos + {qualifier.captainPicks} elecciones del capitán · máximo {qualifier.maxJuniors} juniors
        </p>
        <p className="golf-rules">Capitán: {qualifier.captain}</p>
      </header>
      <main id="main">
        <div className="golf-board-wrap">
          <table className="golf-board">
            <caption className="sr-only">
              Clasificatorio {qualifier.event}, juego por golpes bruto, par {qualifier.par}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="col-pos">Pos</th>
                <th scope="col" className="col-player">Jugador</th>
                <th scope="col" className="col-num">Al par</th>
                <th scope="col" className="col-num">Mejores 4</th>
                <th scope="col" className="col-num">Jugadas</th>
                {qualifier.dates.map((date) => (
                  <th scope="col" className="col-round" key={date.id}>{date.label}</th>
                ))}
                <th scope="col" className="col-status">Estado</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr key={row.player.name} className={row.cutAfter ? "cut-after" : undefined}>
                  <td className="col-pos">{row.posLabel}</td>
                  <td className="col-player">
                    {row.player.name}
                    {row.player.junior ? <abbr className="golf-jr" title="Juvenil">Juv</abbr> : null}
                  </td>
                  <td className={isUnderToPar(row.toPar) ? "col-num under" : "col-num"}>
                    {formatToPar(row.toPar)}
                  </td>
                  <td className="col-num">{row.best4 ?? ""}</td>
                  <td className="col-num">{row.played}</td>
                  {row.player.rounds.map((score, index) => (
                    <td
                      key={qualifier.dates[index].id}
                      className={isUnderParRound(score) ? "col-round under" : "col-round"}
                    >
                      {score ?? ""}
                    </td>
                  ))}
                  <td className={`col-status status-${row.status}`}>{formatStatus(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="golf-note">
          Planilla oficial · 15 ago y 16 ago 2026 · las cuatro fechas restantes por definir
        </p>
      </main>
    </div>
  );
}
