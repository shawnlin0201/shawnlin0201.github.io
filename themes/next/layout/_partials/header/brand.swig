<div class="site-brand-container">
  <div class="site-nav-toggle">
    <div class="toggle" aria-label="{{ __('accessibility.nav_toggle') }}">
      <span class="toggle-line toggle-line-first"></span>
      <span class="toggle-line toggle-line-middle"></span>
      <span class="toggle-line toggle-line-last"></span>
    </div>
  </div>

  <div class="site-meta{%- if theme.custom_logo.enable %} custom-logo{%- endif %}">
    {%- if theme.custom_logo and theme.scheme === 'Muse' %}
      <div class="site-meta-headline">
        <a href="{{ theme.custom_logo.link }}" target="_blank">
          <img class="custom-logo-image" src="{{ theme.custom_logo.image }}" alt="{{ title }}">
        </a>
      </div>
    {%- endif %}

    <a href="{{ config.root }}" class="brand" rel="start">
      <span class="logo-line-before"><i></i></span>
      <h1 class="site-title">{{ title }}</h1>
      <span class="logo-line-after"><i></i></span>
    </a>
    {%- if subtitle %}
      <p class="site-subtitle" itemprop="description">{{ subtitle }}</p>
    {%- endif %}
    {%- if theme.custom_logo.enable and (theme.scheme === 'Gemini' or theme.scheme === 'Pisces') %}
      <a href="{{ theme.custom_logo.link }}" target="_blank">
        <img class="custom-logo-image" src="{{ theme.custom_logo.image }}" alt="{{ title }}">
      </a>
    {%- endif %}
  </div>

  <div class="site-nav-right">
    <div class="toggle popup-trigger">
      {%- if theme.algolia_search.enable or theme.local_search.enable %}
        <i class="fa fa-search fa-fw fa-lg"></i>
      {%- endif %}
    </div>
  </div>
</div>
