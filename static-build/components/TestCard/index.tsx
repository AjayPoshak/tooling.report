import { h, FunctionalComponent } from 'preact';
import {
  $testCard,
  $cardTitle,
  $cardTotal,
  $cardTotalCount,
  $dash,
  $subText,
  $testDesc,
  $testCardIcon,
  $iconList,
} from './styles.css';
import gulp from 'asset-url:../../img/gulp.svg';
import rollup from 'asset-url:../../img/rollup.svg';
import webpack from 'asset-url:../../img/webpack.svg';
import parcel from 'asset-url:../../img/parcel.svg';
const toolImages = { gulp, rollup, webpack, parcel };

interface Props {
  name: string;
  link: string;
  test: Test;
  desc: string;
}

const TestCard: FunctionalComponent<Props> = ({
  name,
  link,
  test,
  desc,
}: Props) => {
  const data = { totalScore: 0, passing: [] as any, partial: [] as any };

  const transformData = () => {
    Object.entries(test.results).forEach(tool => {
      if (tool[1].meta.result === 'pass') {
        data.totalScore += 1;
        data.passing.push(tool[0]);
      } else if (tool[1].meta.result === 'partial') {
        data.totalScore += 0.5;
        data.partial.push(tool[0]);
      }
    });
  };
  transformData();

  const totalTested = () => {
    return Object.entries(test.results).length;
  };

  const renderPassing = () => {
    if (test.subTests) {
      return (
        <div>
          <div class={$cardTotal}>
            <span class={$cardTotalCount}>
              {Object.entries(test.subTests).length}
            </span>
          </div>
          <p class={$subText}>Sub Tests</p>
        </div>
      );
    } else {
      console.log(data.passing);
      return (
        <div>
          <div class={$cardTotal}>
            <span>{data.totalScore}</span>
            <span class={$dash}>/</span>
            <span class={$cardTotalCount}>{totalTested()}</span>
          </div>
          <p class={$subText}>Bundlers Passing</p>
          <div class={$iconList}>
            {data.passing &&
              data.passing.map(tool => (
                <figure class={$testCardIcon} data-result="pass">
                  <img src={toolImages[tool]} />
                  <figcaption>{tool}</figcaption>
                </figure>
              ))}
            {data.partial &&
              data.partial.map(tool => (
                <figure class={$testCardIcon} data-result="partial">
                  <img src={toolImages[tool]} />
                  <figcaption>{tool}</figcaption>
                </figure>
              ))}
          </div>
        </div>
      );
    }
  };

  return (
    <li class={$testCard}>
      <div>
        <a href={link} class={$cardTitle}>
          {name}
        </a>
        <p class={$testDesc}>{desc}</p>
      </div>
      {renderPassing()}
    </li>
  );
};

export default TestCard;
