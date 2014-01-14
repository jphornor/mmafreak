<div class='topnav-section mobilemenu'>
  <div class='container'>
    <nav class="top-nav">
      <?php wp_nav_menu( array( 'theme_location' => 'top-menu', 'container' => false, 'container_class' => 'top-nav', 'menu_class' => '', 'depth' => 1 ) ); ?>
    </nav>
    
    <div class='top-bar'>
      <ul>
        <li class="author-menu dropdown">
          <div class="menu-inner">
            <?php global $current_user; ?>
            <?php if ( !is_user_logged_in() ) { ?>
                <a href="<?php echo wp_login_url( home_url() ); ?>" class="dropdown-toggle" data-toggle="dropdown">
                  <?php echo get_avatar($current_user->user_email, 40); ?> <?php _e('Login here!', 'nesia'); ?> <i class="icon-chevron-down"></i>
                </a>
            <?php } else { ?>
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <?php echo get_avatar($current_user->user_email, 40); ?> <?php echo $current_user->display_name; ?> <i class="icon-chevron-down"></i>
                </a>
           <?php } ?>
            <ul class="dropdown-menu author-dropdown">
                <?php if ( !is_user_logged_in() ) { ?>
              <li>
                <form class="login-form" method="post" action="<?php echo wp_login_url(); ?>">
                  <fieldset>
                    <label class="block-username">
                      <span><?php _e('Username or email', 'nesia'); ?></span>
                      <input class="input-text" type="text" name="log" autocomplete="on">
                    </label>
                    <label class="block-password">
                      <span><?php _e('Password', 'nesia'); ?></span>
                      <input class="input-text" type="password" value="" name="pwd">
                    </label>
                  </fieldset>
                  <fieldset>
                    <label class="block-remember">
                      <input type="checkbox" value="forever" name="rememberme"> <?php _e('Remember me', 'nesia'); ?>
                    </label>
                    <input type="submit" class="btn btn-candyblue btn-login" value="<?php _e('Sign in','nesia'); ?>">
                  </fieldset>
                  <hr class="divider">
                  <a href="<?php echo esc_url( wp_lostpassword_url( home_url() ) ); ?>" class="forgot"><?php _e('Forgot password?', 'nesia'); ?></a>
                  <input type="hidden" name="redirect_to" value="<?php echo home_url('/'); ?>">
                </form>
              </li>
                <?php } else { ?>
              <li>
                  <div class="login-form">
                    <a href="<?php echo esc_url( wp_logout_url( home_url() ) ); ?>" class="forgot"><?php _e('Logout', 'nesia'); ?></a>
                  </div>
              </li>
                <?php } ?>
            </ul><!-- .dropdown-menu -->
          </div>
        </li>
        
        <li class="social-buttons">
          <?php global $nesia_options; ?>
          <ul>
            <?php if($nesia_options['nesia_connect_facebook'] != ''){ ?>
              <li class="facebook-button"><a href="<?php echo esc_url($nesia_options['nesia_connect_facebook']); ?>"><i class="icon-facebook"></i></a></li>
            <?php } if($nesia_options['nesia_connect_twitter'] != ''){ ?>
              <li class="twitter-button"><a href="http://twitter.com/<?php echo esc_attr($nesia_options['nesia_connect_twitter']); ?>"><i class="icon-twitter"></i></a></li>
            <?php } ?>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</div>
<!-- /End of Top nav section -->