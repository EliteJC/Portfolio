/**
 * Loads project content from data/projects.json based on ?slug= in the URL.
 * Open via local server (Live Server, `npx serve`, etc.) — fetch() may fail on file://
 */
(function () {
  'use strict';

  function getSlug() {
    var params = new URLSearchParams(window.location.search);
    return (params.get('slug') || '').trim();
  }

  function escapeHtml(s) {
    if (s == null) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function renderMetaRow(meta) {
    if (!meta || !meta.length) return '';
    return meta
      .map(function (m) {
        return (
          '<div class="meta-pill">' +
          '<span class="meta-label">' + escapeHtml(m.label) + '</span>' +
          '<span class="meta-value">' + escapeHtml(m.value) + '</span>' +
          '</div>'
        );
      })
      .join('');
  }

  function renderTags(tags) {
    if (!tags || !tags.length) return '';
    return tags
      .map(function (t) {
        return '<span class="detail-chip">' + escapeHtml(t) + '</span>';
      })
      .join('');
  }

  function renderMedia(media) {
    if (!media || !media.src) return '';
    var alt = escapeHtml(media.alt || '');
    if (media.type === 'video') {
      var posterAttr = media.poster
        ? ' poster="' + escapeHtml(media.poster) + '"'
        : '';
      return (
        '<video autoplay muted loop playsinline preload="metadata"' +
        posterAttr +
        '>' +
        '<source src="' +
        escapeHtml(media.src) +
        '" type="video/mp4">' +
        '</video>'
      );
    }
    return '<img src="' + escapeHtml(media.src) + '" alt="' + alt + '">';
  }

  /** Background media: decorative (parent has aria-hidden); keeps video poster behavior */
  function renderHeroMedia(media) {
    if (!media || !media.src) return '';
    if (media.type === 'video') {
      return renderMedia(media);
    }
    return '<img src="' + escapeHtml(media.src) + '" alt="">';
  }

  function renderShowcases(showcases) {
    if (!showcases || !showcases.length) return '';
    return showcases
      .map(function (s) {
        var bullets = (s.bullets || [])
          .map(function (b) {
            return '<li>' + escapeHtml(b) + '</li>';
          })
          .join('');
        return (
          '<article class="showcase-item">' +
          '<div class="showcase-media">' +
          renderMedia(s.media) +
          '</div>' +
          '<div class="showcase-copy">' +
          '<p class="showcase-kicker">' +
          escapeHtml(s.kicker || '') +
          '</p>' +
          '<h3>' +
          escapeHtml(s.heading || '') +
          '</h3>' +
          '<ul>' +
          bullets +
          '</ul>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');
  }

  function showError(message) {
    var hero = document.getElementById('project-hero');
    var overview = document.getElementById('project-overview');
    var showcase = document.getElementById('project-showcase');
    var errHtml =
      '<div class="project-page-error"><p>' +
      escapeHtml(message) +
      '</p><p class="project-page-error-hint">Expected URL like <code>project.html?slug=thebook</code></p></div>';
    if (hero) {
      hero.className = 'project-banner';
      hero.innerHTML =
        '<div class="project-banner-overlay"></div><div class="project-banner-content">' +
        errHtml +
        '</div>';
    }
    if (overview) overview.innerHTML = '';
    if (showcase) showcase.innerHTML = '';
    document.title = 'Project | Juan Devarie';
  }

  function applyProject(p) {
    document.title = (p.title || 'Project') + ' | Juan Devarie';

    var leadHtml = p.lead
      ? '<p class="project-lead">' + escapeHtml(p.lead) + '</p>'
      : '';

    var metaHtml = renderMetaRow(p.meta);
    var metaRowHtml = metaHtml
      ? '<div class="project-meta-row">' + metaHtml + '</div>'
      : '';

    var hero = document.getElementById('project-hero');
    if (hero) {
      hero.className = 'project-banner';
      hero.innerHTML =
        '<div class="project-banner-media" aria-hidden="true">' +
        renderHeroMedia(p.heroMedia) +
        '</div>' +
        '<div class="project-banner-overlay"></div>' +
        '<div class="project-banner-content">' +
        '<span class="project-category-tag">' +
        escapeHtml(p.category || 'Gameplay Programming') +
        '</span>' +
        '<h1>' +
        escapeHtml(p.title) +
        '</h1>' +
        '<p class="sub-info">' +
        escapeHtml(p.subInfo || '') +
        '</p>' +
        leadHtml +
        metaRowHtml +
        '</div>';
    }

    var overview = document.getElementById('project-overview');
    if (overview) {
      overview.innerHTML =
        '<h2 class="detail-label">Overview</h2>' +
        '<p class="project-overview-copy">' +
        escapeHtml(p.overview || '') +
        '</p>' +
        '<div class="tag-group">' +
        renderTags(p.tags) +
        '</div>';
    }

    var showcase = document.getElementById('project-showcase');
    if (showcase) {
      showcase.innerHTML =
        '<h2 class="detail-label">Visual Breakdown</h2>' + renderShowcases(p.showcases);
    }
  }

  function run() {
    var slug = getSlug();
    if (!slug) {
      showError('No project slug in the URL.');
      return;
    }

    fetch('data/projects.json')
      .then(function (r) {
        if (!r.ok) throw new Error('Could not load projects data.');
        return r.json();
      })
      .then(function (data) {
        var list = (data && data.projects) || [];
        var project = list.find(function (x) {
          return x.slug === slug;
        });
        if (!project) {
          showError('No project found for slug "' + slug + '".');
          return;
        }
        applyProject(project);
      })
      .catch(function () {
        showError(
          'Could not load data/projects.json. Use a local web server (not raw file://) or check the file path.'
        );
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
