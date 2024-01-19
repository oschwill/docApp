import expertiseAreaModel from '../models/expertiseAreaModel.js';

const expAreas = [
  {
    headTitle: 'Facharzt für Allgemeinmedizin',
    title: 'Allgemeinmediziner/in',
    description:
      'Das Aufgabengebiet der Fachärztin oder des Facharztes für Allgemeinmedizin umfasst die gesundheitliche Grundversorgung aller Patientinnen und Patienten, sowohl in akuten Fällen als auch in der Langzeitversorgung.',
  },
  {
    headTitle: 'Facharzt für Anästhesiologie',
    title: 'Anästhesiologe/in',
    description:
      'Fachärztinnen und Fachärzte für Anästhesiologie, die sogenannten Anästhesistinnen und Anästhesisten, werden allgemein auch als Narkoseärzte bezeichnet. Sie begleiten ihre Patient:innen durch den gesamten Prozess der Anästhesie/Narkose und stehen ihnen vor, während und nach dem medizinischen Eingriff zur Seite.',
  },
  {
    headTitle: 'Facharzt für Visceralchirurgie',
    title: 'Visceralchirug/in',
    description:
      'Facharzt/-ärztin - Viszeralchirurgie erstellen einen Therapieplan. So nehmen sie konventionelle, minimalinvasive (Schlüssellochchirurgie) und endoskopische operative Eingriffe am Verdauungsapparat (gastroenterologische Chirurgie) vor, z.B. an Magen, Dünn- und Dickdarm oder Leber.',
  },
  {
    headTitle: 'Facharzt für Hals-Nasen-Ohrenheilkunde',
    title: 'Hals-Nasen-Ohren-Arzt/in',
    description:
      'Fachärzte für HNO-Heilkunde beschäftigen sich mit Erkrankungen, Verletzungen, Verletzungsfolgen, Fehlbildungen und Funktionsstörungen der Ohren, der oberen Luftwege, der Mundhöhle, des Rachens, des Kehlkopfes, der unteren Luftwege und der Speiseröhre.',
  },
  {
    headTitle: 'Facharzt für Gefäßchirurgie',
    title: 'Gefäßchirurg/in',
    description:
      'Die Gefäßchirurgie ist ein Teilgebiet der Chirurgie, das sich mit den den Arterien, Venen und Lymphgefäßen beschäftigt. Dazu gehören die Diagnose, operative Behandlung und Nachsorge von Gefäßkrankheiten und -verletzungen. Dauer: Die Facharzt-Weiterbildung in der Gefäßchirurgie dauert 72 Monate.',
  },
  {
    headTitle: 'Facharzt für Herzchirurgie',
    title: 'Kardiologe/in',
    description:
      'Facharzt/-ärztin - Herzchirurgie tauschen Aggregate aus. Sie nehmen Bypassoperationen, Herztransplantationen, Lungen- sowie Herz-Lungen-Verpflanzungen vor oder greifen operativ-korrigierend nach Venenentfernungen ein.',
  },
  {
    headTitle: 'Facharzt für Innere Medizin und Pneumologie',
    title: 'Pneumologe/in',
    description:
      'Fachärzte für Innere Medizin und Pneumologie sind Experten für alle an der Atmung beteiligten Organsysteme. Im beruflichen Alltag sind sie mit den unterschiedlichsten Krankheitsbildern konfrontiert: von klassischen Lungenerkrankungen wie Asthma bronchiale bis zu bakteriellen Infektionskrankheiten wie Tuberkulose.',
  },
  {
    headTitle: 'Facharzt für Innere Medizin und Rheumatologie',
    title: 'Rheumatologe/in',
    description:
      'Fachärzte für Innere Medizin und Rheumatologie sind entsprechend ihrer Weiterbildung spezialisiert auf die Diagnose und nicht-operative Behandlung von Patienten mit autoimmunbedingten entzündlich- rheumatischen Erkrankungen, z.B. der rheumatoiden Athritis (chronischen Polyarthritis), der Psoriasisarthritis, der ...',
  },
  {
    headTitle: 'Facharzt für Neurologie',
    title: 'Neurologe/in',
    description:
      'Ein Neurologe ist daher ein Facharzt der auf die Erkennung und Behandlung von Erkrankungen des Gehirns, der Sinnesorgane, des Rückenmarks, der peripheren Nerven einschließlich der Nervenwurzeln und der Muskeln spezialisiert ist.',
  },
  {
    headTitle: 'Facharzt für Urologie',
    title: 'Urologe/in',
    description:
      'Facharzt/-ärztin - Urologie Fachärzte und -ärztinnen für Urologie untersuchen Organe wie Niere, Harnleiter, Harnröhre, Hoden, Samenleiter, Penis sowie Prostata und erkennen und behandeln Störungen sowie Erkrankungen dieser Organe einschließlich urologischer Tumorbildungen.',
  },
  {
    headTitle: 'Facharzt für Psychiatrie und Psychotherapie',
    title: 'Psychiater/in',
    description:
      'Ein Arzt für Psychiatrie und Psychotherapie untersucht und behandelt krankhafte Veränderungen und Störungen der Gefühle, des Denkens, aber auch der Stimmungen, des Antriebs, des Gedächtnisses oder des Erlebens und Verhaltens.',
  },
  {
    headTitle: 'Facharzt für Mikrobiologie, Virologie und Infektionsepidemiologie',
    title: 'Virologe/in',
    description:
      'Fachärzte für Mikrobiologie, Virologie und Infektionsepidemiologie beschäftigen sich mit der Labordiagnostik der durch Mikroorganismen, Viren und andere übertragbare Agenzien bedingten Erkrankungen.',
  },
  {
    headTitle: 'Facharzt für Radiologie',
    title: 'Radiologe/in',
    description:
      'Die interventionelle Radiologie stellt ein Bindeglied zwischen der konservativen und der operativen Medizin dar. Dazu gehören Eingriffe wie die Versorgung von Aneurysmen, Blutstillung und Drainagenanlagen, rekanalisierende Massnahmen an peripheren Gefässen und die Schmerztherapie.',
  },
  {
    headTitle: 'Fachkraft für Physiotherapie',
    title: 'Physiotherapeut/in',
    description:
      'Die Physiotherapie ist eine an der Physiologie und Pathologie orientierte Bewegungstherapie und nutzt spezielle Behandlungstechniken. Sie wird eingesetzt bei Störungen des Bewegungsapparates, des zentralen und peripheren Nervensystems, sowie bei Erkrankungen der inneren Organe und der Psyche.',
  },
  {
    headTitle: 'Fachkraft für Parodontologie',
    title: 'Zahnarzt/in',
    description:
      'Zahnärzt*innen behandeln Zähne sowie Zahn- und Kiefererkrankungen und beraten ihre Patient*innen über die richtige Zahnpflege. Sie entfernen Karies und Zahnstein und füllen Zahnlücken mit Füllungen, wie z. B. Amalgam, Gold, Keramik oder Porzellan.',
  },
];

export const insertExpertiseAreas = async () => {
  try {
    expAreas.forEach(async (item) => {
      // console.log(item);
      await expertiseAreaModel.findOneAndUpdate({ headTitle: item.headTitle }, item, {
        upsert: true,
      });
    });
  } catch (error) {
    console.log(`Fehler beim Einfügen der Daten ${error}`);
  }
};
