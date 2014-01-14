<div class='primarynav-section mobilemenu'>
  <div class='container'>
    <nav class='primary-nav'>
      <div class='button-wrapper'>
        <button class='btn btn-navbar btn-sidebar'>
          <span class='icon-bar'></span>
          <span class='icon-bar'></span>
        </button>
        <button class='btn btn-navbar btn-topmenu'>
          <i class='icon-chevron-up'></i>
        </button>
        <button class='btn btn-navbar btn-mainmenu' data-target='.nav-collapse' data-toggle='collapse' type='button'>
          <span class='icon-bar'></span>
          <span class='icon-bar'></span>
          <span class='icon-bar'></span>
        </button>
      </div>
      
      <div class='nav-collapse collapse'>
        <?php wp_nav_menu( array( 'theme_location' => 'main-menu', 'container' => 'nav', 'container_class' => 'man-nav', 'menu_class' => '') ); ?>
      </div>
    </nav>
    
    <div class='subnav'>
      <form class='search-box slideup' action="<?php echo home_url('/'); ?>">
        <input name="s" placeholder='<?php _e('Type your keywords here and pick your categories', 'nesia'); ?>' type='text' />
        <?php wp_dropdown_categories(); ?>
        <input type='submit' value='<?php _e('Search','nesia'); ?>' />
      </form>
      
      <div class='search-button'>
        <a href="#"> <i class="icon-search"></i> <?php _e('Search','nesia'); ?> </a>
      </div>
        <?php nesia_breadcrumbs(array( 'separator' => '/' )); ?>
    </div>
  </div>
</div>
<!-- /End of primary nav section -->