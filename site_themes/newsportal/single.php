<?php
/**
 * Single post
 *
 * @package WordPress
 * @subpackage Newsportal
 * @since Newsportal 1.0
 */
global $nesia_options;
get_header();
?>

<div class='main-container container'>
  <div class='row'>
      
    <?php if(have_posts()): the_post(); ?>
      
    <section class='main span8'>
      
      
    <article class='entry-post entry-single'>
      <div class='entry-header-wrapper row'>
        <time class='entry-date-badge'>
          <span class='month'><?php echo get_the_date('M'); ?></span>
          <span class='day'><?php echo get_the_date('d'); ?></span>
          <span class='year'><?php echo get_the_date('Y'); ?></span>
        </time>
        <div class='entry-category'>
          <?php the_category(', '); ?>
        </div>
        <header class='entry-header'>
          <h2><?php the_title(); ?></h2>
        </header>
        <?php get_template_part('content', 'entry-info'); ?>
      </div>
      <!-- /End of entry header wrapper -->
      
      <?php get_template_part('content', 'video'); ?>

      <div class='entry-content-wrapper row'>
        <time class='entry-date'><?php echo get_the_date(); ?></time>
        <div class='entry-content'>
          <?php the_content(); ?>
          <?php wp_link_pages( array( 'before' => '<div class="page-link"><span>' . __( 'Pages:', 'nesia' ) . '</span>', 'after' => '</div>' ) ); ?>

          <p class='entry-meta-footer'>
            <?php _e('Categories:', 'nesia'); ?> <?php the_category(', '); ?><br>
            <?php the_tags( __('Tags: ', 'nesia'), ', ', '' ); ?>
          </p>
          <p id="post-like">
            <?php echo nesia_get_post_like_link( get_the_ID() ); ?>
          </p>
          <p class='facebook-share-like'>
            <a class='addthis_button_facebook_like' fb:like:layout='standard' fb:like:send='true'></a>
          </p>
        </div>
      </div>
      <!-- /End of Entry Content Wrapper -->
    </article>
      <div class='post-bottom'>
        <div class='row'>
          <div class='addthis_toolbox addthis_default_style offset1'>
            <h6 class='meta-title'><?php _e('Share This Post', 'nesia'); ?></h6>
            <a class='addthis_button_tweet'></a>
            <a class='addthis_button_google_plusone' g:plusone:size='medium'></a>
            <a class='addthis_counter addthis_pill_style'></a>
          </div>
        </div>
        <div class='author-info'>
          <div class='author-avatar'>
            <?php echo get_avatar( get_the_author_meta( 'user_email' ), 68 ); ?>
          </div>
          <div class='author-title'>
            <span class='name'><?php the_author(); ?></span>
            <span class='post-count'><?php printf( __('(have %s posts in total)', 'nesia'), nesia_count_userpost( get_the_author_meta( 'ID' ) ) ); ?></span>
          </div>
          <div class='author-description'>
            <?php the_author_meta( 'description' ); ?>
            <div id="author-link">
                <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" rel="author"><?php _e( 'View posts', 'nesia' ); ?></a>
                <?php if(get_the_author_meta( 'url' ) != ''){ ?><a href="<?php echo esc_url( get_the_author_meta( 'url' ) ); ?>" rel="author"><?php _e('Visit website', 'nesia'); ?></a><?php } ?>
                <?php if(get_the_author_meta( 'twitter' ) != ''){ ?><a href="http://twitter.com/<?php echo get_the_author_meta( 'twitter' ); ?>" rel="author"><?php _e('Visit twitter', 'nesia'); ?></a><?php } ?>
                <?php if(get_the_author_meta( 'facebook' ) != ''){ ?><a href="<?php echo esc_url( get_the_author_meta( 'facebook' ) ); ?>" rel="author"><?php _e('Visit facebook', 'nesia'); ?></a><?php } ?>
            </div>
          </div>
          <!-- #author-description -->
        </div>
        <!-- /End of Author Info -->
        <div class='row'>
          <?php if( nesia_get_ads('nesia_ads_260_1') OR nesia_get_ads('nesia_ads_260_2') ){ ?>
          <div class='clearfix offset1' id='ads-below-content'>
            <span class="adspot spot1"><?php echo nesia_get_ads('nesia_ads_260_1'); ?></span>
            <span class="adspot spot2"><?php echo nesia_get_ads('nesia_ads_260_2'); ?></span>
            <span class="adsinfo"><?php _e('Sponsored Ads', 'nesia'); ?></span>
          </div>
          <!-- #ads-below-content -->
          <?php } ?>
          <div class='offset1' id='related-articles'>
              <?php get_template_part('content', 'related-posts'); ?>
          </div>
        </div>
      </div>
        
    <?php endif; ?>
                
    <?php $comm = $nesia_options[ 'nesia_comments' ];
          if ( ( $comm == 'post' || $comm == 'both' ) && is_single() ) { comments_template(); }
    ?>	
       
</section>
    
    <?php get_sidebar(); ?>
<!-- /End Primary Sidebar -->
  </div>
</div>
<!-- /End of Main Container -->

<?php get_footer(); ?>