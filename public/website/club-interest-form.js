// Victorian Government Know Your Council locality list for Greater Bendigo.
// https://www.vic.gov.au/know-your-council-greater-bendigo-city-council
const greaterBendigoLocalities = Object.freeze([
  'Argyle', 'Ascot', 'Avonmore', 'Axe Creek', 'Axedale', 'Bagshot', 'Bagshot North', 'Barnadown',
  'Bendigo', 'Bendigo East', 'Bendigo North', 'Bendigo West', 'Big Hill', 'California Gully',
  'Costerfield', 'Derrinal', 'Diamond Hill', 'Drummartin', 'Eaglehawk', 'Eaglehawk North', 'Elmore',
  'Emu Creek', 'Eppalock', 'Epsom', 'Flora Hill', 'Fosterville', 'Golden Gully', 'Golden Square',
  'Goornong', 'Harcourt North', 'Heathcote', 'Hunter', 'Huntly', 'Huntly North', 'Ironbark',
  'Jackass Flat', 'Junortoun', 'Kamarooka', 'Kangaroo Flat', 'Kennington', 'Kimbolton', 'Knowsley',
  'Ladys Pass', 'Leichardt', 'Lockwood', 'Lockwood South', 'Long Gully', 'Longlea', 'Lyal',
  'Maiden Gully', 'Mandurang', 'Mandurang South', 'Marong', 'Mia Mia', 'Minto', 'Mosquito Creek',
  'Mount Camel', 'Myers Flat', 'Myrtle Creek', 'Neilborough', 'Pilchers Bridge', 'Quarry Hill',
  'Raywood', 'Redcastle', 'Redesdale', 'Sailors Gully', 'Sandhurst East', 'Sebastian', 'Sedgwick',
  'Shelbourne', 'Specimen Hill', 'Spring Gully', 'Strathdale', 'Strathfieldsaye', 'Summerfield',
  'Toolleen', 'Tysons Reef', 'Wellsford', 'Whipstick', 'White Hills', 'Wilsons Hill', 'Woodvale'
]);

const associationOptions = Object.freeze({
  'Australian rules football': ['Bendigo Football Netball League', 'Bendigo Junior Football League', 'Heathcote District Football Netball League', 'Loddon Valley Football Netball League'],
  Badminton: ['Bendigo Eaglehawk Badminton Association'],
  Baseball: ['Bendigo Baseball Association'],
  Basketball: ['Bendigo Basketball Association'],
  Cricket: ['Bendigo District Cricket Association', 'Emu Valley Cricket Association'],
  Croquet: ['Goldfields Croquet Association', 'Northern District Croquet Association'],
  'Gridiron (American football)': ['Gridiron Victoria'],
  Hockey: ['Hockey Central Victoria'],
  'Lawn bowls': ['Bendigo Campaspe Goldfields Bowls Region'],
  Netball: ['Bendigo Football Netball League', 'Bendigo Strathdale Netball Association', 'Central Victorian Netball Association', 'Golden City Netball Association', 'Monday Ladies Netball Association'],
  'Rugby league': ['NRL Victoria'],
  'Rugby union': ['Rugby Victoria'],
  Soccer: ['FV Greater Bendigo'],
  Swimming: ['Central Victoria Swimming'],
  'Table tennis': ['Bendigo & District Table Tennis Association'],
  Tennis: ['Marong & District Tennis Association'],
  Volleyball: ['Bendigo Volleyball Association']
});

export const getAssociationsForSport = sport => associationOptions[sport] ?? [];
export const getGreaterBendigoLocalities = () => [...greaterBendigoLocalities];

export function bindClubInterestForm(root) {
  const openInterest = root.querySelector?.('#open-club-interest');
  const cancelInterest = root.querySelector?.('#cancel-club-interest');
  const interestForm = root.querySelector?.('#club-interest-form');
  const contactName = root.querySelector?.('#club-interest-contact-name');
  if (openInterest && cancelInterest && interestForm) {
    openInterest.addEventListener('click', () => {
      interestForm.hidden = false;
      openInterest.hidden = true;
      openInterest.setAttribute('aria-expanded', 'true');
      contactName?.focus();
    });
    cancelInterest.addEventListener('click', () => {
      interestForm.hidden = true;
      openInterest.hidden = false;
      openInterest.setAttribute('aria-expanded', 'false');
      openInterest.focus();
    });
  }

  const sport = root.querySelector?.('#club-interest-sport');
  const association = root.querySelector?.('#club-interest-association');
  const otherSportField = root.querySelector?.('#club-interest-other-sport-field');
  const otherSport = root.querySelector?.('#club-interest-other-sport');
  const otherAssociationField = root.querySelector?.('#club-interest-other-association-field');
  const otherAssociation = root.querySelector?.('#club-interest-other-association');
  const locality = root.querySelector?.('#club-interest-locality');
  const otherLocalityField = root.querySelector?.('#club-interest-other-locality-field');
  const otherLocality = root.querySelector?.('#club-interest-other-locality');
  if (!sport || !association) return;

  const addOption = (label, value = label) => {
    const option = association.ownerDocument.createElement('option');
    option.value = value;
    option.textContent = label;
    association.append(option);
  };
  const showOtherField = (field, input, visible) => {
    if (!field || !input) return;
    field.hidden = !visible;
    input.required = visible;
    if (!visible) input.value = '';
  };
  const updateOtherAssociation = () => showOtherField(otherAssociationField, otherAssociation, association.value === 'Other');
  const updateAssociations = () => {
    showOtherField(otherSportField, otherSport, sport.value === 'Other');
    showOtherField(otherAssociationField, otherAssociation, false);
    association.replaceChildren();
    if (!sport.value) {
      addOption('Choose a sport first', '');
      association.disabled = true;
      return;
    }
    addOption('Choose a league or association', '');
    getAssociationsForSport(sport.value).forEach(name => addOption(name));
    addOption('Other');
    association.disabled = false;
  };

  sport.addEventListener('change', updateAssociations);
  association.addEventListener('change', updateOtherAssociation);
  locality?.addEventListener('change', () => {
    showOtherField(otherLocalityField, otherLocality, locality.value === 'Other');
  });
  updateAssociations();
}
