const shared = Object.freeze({
  confirmLabel: 'Discard changes',
  cancelLabel: 'Keep editing'
});

export function describeDestructiveStudioAction({ action, garmentName } = {}) {
  if (action === 'change-template') return {
    title: 'Change garment template?',
    message: `Changing to the ${garmentName} template will remove all changes in this browser-session design and start a new design.`,
    ...shared
  };
  if (action === 'reset-design') return {
    title: 'Reset this design?',
    message: 'Resetting will remove all changes in this browser-session design and restore the starting design.',
    ...shared
  };
  return null;
}
