export const ROLES = Object.freeze({ CLUB_ADMIN: 'club_admin', PRIMARY: 'primary_approver', PIVOT: 'pivot_admin' });
export const STATUSES = Object.freeze({ DRAFT:'draft', CLUB:'club_approved', PIVOT:'pivot_approved', REVISION:'revision_requested', PUBLISHED:'published' });

export function canAccessClub(user, clubId) {
  return Boolean(user && (user.role === ROLES.PIVOT || user.clubId === clubId));
}
export function transition(design, action, user, now = new Date().toISOString()) {
  if (!canAccessClub(user, design.clubId)) throw coded('FORBIDDEN', 'You cannot access this club.');
  const next = structuredClone(design);
  const rules = {
    save: { from:[STATUSES.DRAFT, STATUSES.REVISION], roles:[ROLES.CLUB_ADMIN, ROLES.PRIMARY], to:STATUSES.DRAFT },
    clubApprove: { from:[STATUSES.DRAFT, STATUSES.REVISION], roles:[ROLES.PRIMARY], to:STATUSES.CLUB },
    pivotApprove: { from:[STATUSES.CLUB], roles:[ROLES.PIVOT], to:STATUSES.PIVOT },
    return: { from:[STATUSES.CLUB], roles:[ROLES.PIVOT], to:STATUSES.REVISION },
    publish: { from:[STATUSES.PIVOT], roles:[ROLES.PIVOT], to:STATUSES.PUBLISHED }
  };
  const rule = rules[action];
  if (!rule || !rule.roles.includes(user.role)) throw coded('FORBIDDEN', 'This role cannot perform that action.');
  if (!rule.from.includes(design.status)) throw coded('INVALID_TRANSITION', `Cannot ${action} from ${design.status}.`);
  next.status = rule.to;
  if (action === 'save') next.version += 1;
  next.audit.push({ action, actor:user.email, version:next.version, at:now });
  return next;
}
export function publicProducts(state, clubSlug) {
  const club = state.clubs.find(c => c.slug === clubSlug && c.enabled);
  if (!club) return null;
  return { club, products:state.designs.filter(d => d.clubId === club.id && d.status === STATUSES.PUBLISHED) };
}
function coded(code, message) { const error = new Error(message); error.code = code; return error; }
