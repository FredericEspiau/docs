import * as React from 'react';
import styled from 'styled-components';
import TOC from './toc';
import TechnologySwitch from './techSwitcher';

const TopSectionWrapper = styled.div`
  position: relative;
  hr.bigger-margin {
    margin-top: 3.5rem;
    margin-bottom: 4rem;
  }
`;

const BreadcrumbTitle = styled.h4`
  color: #718096;
  line-height: 1rem;
  margin: 0;
`;

const MainTitle = styled.h1`
  font-family: 'Montserrat';
  font-size: 2rem;
  font-style: normal;
  font-weight: bold;
  letter-spacing: -0.02em;
  color: #1a202c;
  margin: 0;
  margin-top: 4px;
`;

const SwitcherWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 78px;
`;

const TopSection = ({ location, title, parentTitle, indexPage, langSwitcher, dbSwitcher }: any) => {
  const [langSelected, setLangSelected] = React.useState('typescript');
  const [dbSelected, setDbSelected] = React.useState('postgres');

  const techChanged = (item: any, type: string) => {
    const elements = document.querySelectorAll('[id^="techswitch"]');
    elements.forEach((element: any) => element.classList.remove('show'));
    const elemToShow = [].slice.call(elements).filter((elm: any) => {
      if (type === 'lang') {
        return dbSwitcher
          ? elm.id.includes(`-${item.technology}`) && elm.id.includes(`-${dbSelected}`)
          : elm.id.includes(`-${item.technology}`);
      } else if (type === 'db') {
        return langSwitcher
          ? elm.id.includes(`-${item.technology}`) && elm.id.includes(`-${langSelected}`)
          : elm.id.includes(`-${item.technology}`);
      }
    });
    elemToShow && elemToShow.forEach((eShow: any) => eShow.classList.add('show'));
  };

  const langChanged = (item: any) => {
    techChanged(item, 'lang');
    setLangSelected(item.technology);
  };

  const dbChanged = (item: any) => {
    techChanged(item, 'db');
    setDbSelected(item.technology);
  };

  React.useEffect(() => {
    if (langSwitcher && !dbSwitcher) {
      langChanged({ technology: langSelected });
    } else if (dbSwitcher && !langSwitcher) {
      dbChanged({ technology: dbSelected });
    } else if (dbSwitcher && langSwitcher) {
      langChanged({ technology: langSelected });
      dbChanged({ technology: dbSelected });
    }
  });

  return (
    <TopSectionWrapper>
      {!indexPage && <BreadcrumbTitle>{parentTitle}</BreadcrumbTitle>}
      <MainTitle>{title}</MainTitle>
      {!indexPage && <hr className={`${langSwitcher || dbSwitcher ? 'bigger-margin' : ''}`} />}
      <SwitcherWrapper>
        {langSwitcher && <TechnologySwitch type="lang" onChangeTech={langChanged} />}
        {dbSwitcher && <TechnologySwitch type="db" onChangeTech={dbChanged} />}
      </SwitcherWrapper>
      {!indexPage && <TOC location={location} />}
    </TopSectionWrapper>
  );
};

export default TopSection;
